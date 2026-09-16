import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TransportService, TransportRoute, StudentRouteMapping } from '../../transport.service';
import { StudentsService, Student } from '../../../students/students.service';
import { FeesService } from '../../../fees/fees.service';
import { CURRENT_ACADEMIC_YEAR, classNameById } from '../../../../core/constants/classes';

/**
 * Owner view of one transport route: who's currently assigned, and a search-and-add
 * panel to put another student on it. Adding a student does two things in sequence --
 * creates the route mapping, then adds the route's monthly fee as a new pending due on
 * that student's fee ledger -- so "add to route" and "pending total goes up" always
 * happen together.
 */
@Component({
  selector: 'app-route-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="p-6 space-y-6">
      <a routerLink="/transport" class="text-primary-600 hover:text-primary-700 text-sm">← Transport</a>

      <div *ngIf="loading()" class="p-8 text-center text-neutral-500">Loading route...</div>
      <div *ngIf="error()" class="p-8 text-center text-error-600">{{ error() }}</div>

      <ng-container *ngIf="route() as r">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h1 class="text-2xl font-bold text-neutral-900">{{ r.name }}</h1>
          <p class="text-neutral-600 text-sm mt-1">
            {{ r.startPoint || '—' }} → {{ r.endPoint || '—' }}
            &nbsp;·&nbsp; Monthly fee: {{ r.monthlyFee != null ? ('₹' + r.monthlyFee) : '—' }}
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-neutral-200">
            <h2 class="text-lg font-semibold text-neutral-900">Students on this route</h2>
          </div>
          <div *ngIf="studentsLoading()" class="p-8 text-center text-neutral-500">Loading...</div>
          <div *ngIf="studentsError()" class="p-8 text-center text-error-600">{{ studentsError() }}</div>
          <div *ngIf="!studentsLoading() && !studentsError() && mappings().length === 0" class="p-8 text-center text-neutral-500">No students assigned yet.</div>
          <table *ngIf="!studentsLoading() && !studentsError() && mappings().length > 0" class="w-full text-sm">
            <thead class="bg-neutral-50 text-neutral-600 text-left">
              <tr><th class="px-6 py-3 font-medium">Student</th><th class="px-6 py-3 font-medium">Admission #</th><th class="px-6 py-3 font-medium">Pickup point</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let m of mappings()" class="border-t border-neutral-200">
                <td class="px-6 py-3 text-neutral-900">{{ m.studentName }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ m.admissionNumber || '—' }}</td>
                <td class="px-6 py-3 text-neutral-600">{{ m.pickupPoint }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
          <h2 class="text-lg font-semibold text-neutral-900 mb-1">Add a student to this route</h2>
          <p class="text-xs text-neutral-500 mb-4">Search by name or admission number, set their pickup point, then add. This also adds this route's monthly fee (₹{{ r.monthlyFee }}) as a new pending due on their fee ledger.</p>
          <div class="flex flex-wrap gap-3 mb-4">
            <input [(ngModel)]="searchKeyword" (keyup.enter)="searchStudents()" placeholder="e.g. Aarav or ADM-1023"
              class="flex-1 min-w-[200px] px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <input [(ngModel)]="pickupPoint" placeholder="Pickup point *"
              class="w-48 px-4 py-2.5 border border-neutral-300 rounded-lg text-sm">
            <button (click)="searchStudents()" [disabled]="searching()" class="px-4 py-2.5 border border-neutral-300 rounded-lg text-sm hover:bg-neutral-50">
              {{ searching() ? 'Searching...' : 'Search' }}
            </button>
          </div>
          <p *ngIf="searchError()" class="text-error-600 text-sm">{{ searchError() }}</p>
          <p *ngIf="!searchError() && searched() && searchResults().length === 0" class="text-neutral-500 text-sm">No students matched.</p>
          <p *ngIf="addMsg()" class="text-sm mb-2" [class]="addOk() ? 'text-success-600' : 'text-error-600'">{{ addMsg() }}</p>
          <table *ngIf="searchResults().length > 0" class="w-full text-sm">
            <thead class="text-neutral-500 text-left text-xs">
              <tr><th class="py-2">Student</th><th class="py-2">Class</th><th class="py-2"></th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let s of searchResults()" class="border-t border-neutral-100">
                <td class="py-2 font-medium text-neutral-900">{{ s.fullName }}</td>
                <td class="py-2 text-neutral-600">{{ className(s.classId) }}</td>
                <td class="py-2 text-right">
                  <button (click)="addStudent(s, r)" [disabled]="!pickupPoint.trim() || addingStudentId() === s.id"
                    class="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white rounded-lg text-xs font-medium">
                    {{ addingStudentId() === s.id ? 'Adding...' : 'Add to route' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ng-container>
    </div>
  `,
})
export class RouteDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private transportService = inject(TransportService);
  private studentsService = inject(StudentsService);
  private feesService = inject(FeesService);

  private routeId = '';

  route = signal<TransportRoute | null>(null);
  loading = signal(false);
  error = signal('');

  mappings = signal<StudentRouteMapping[]>([]);
  studentsLoading = signal(false);
  studentsError = signal('');

  searchKeyword = '';
  pickupPoint = '';
  searching = signal(false);
  searched = signal(false);
  searchError = signal('');
  searchResults = signal<Student[]>([]);

  addingStudentId = signal<string | null>(null);
  addMsg = signal('');
  addOk = signal(false);

  className = classNameById;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) { this.error.set('No route id in the URL.'); return; }
    this.routeId = id;
    this.load();
  }

  load(): void {
    this.loading.set(true); this.error.set('');
    this.transportService.getRoute(this.routeId).subscribe({
      next: (r) => { this.route.set(r); this.loading.set(false); },
      error: (err) => { this.error.set(this.msg(err, 'Failed to load the route.')); this.loading.set(false); },
    });
    this.loadMappings();
  }

  loadMappings(): void {
    this.studentsLoading.set(true); this.studentsError.set('');
    this.transportService.getStudentsOnRoute(this.routeId).subscribe({
      next: (list) => { this.mappings.set(list ?? []); this.studentsLoading.set(false); },
      error: (err) => { this.studentsError.set(this.msg(err, 'Failed to load students on this route.')); this.studentsLoading.set(false); },
    });
  }

  searchStudents(): void {
    if (!this.searchKeyword.trim()) return;
    this.searching.set(true); this.searchError.set(''); this.searched.set(false);
    this.studentsService.list({ keyword: this.searchKeyword, pageSize: 20 }).subscribe({
      next: (page) => { this.searchResults.set(page?.items ?? []); this.searching.set(false); this.searched.set(true); },
      error: (err) => { this.searchError.set(this.msg(err, 'Search failed.')); this.searching.set(false); },
    });
  }

  addStudent(student: Student, route: TransportRoute): void {
    if (!this.pickupPoint.trim()) { this.addOk.set(false); this.addMsg.set('Enter a pickup point first.'); return; }
    if (!student.classId) { this.addOk.set(false); this.addMsg.set('This student has no class on record.'); return; }

    this.addingStudentId.set(student.id); this.addMsg.set('');
    const pickupPoint = this.pickupPoint.trim();

    this.transportService.mapStudentToRoute({ studentId: student.id, routeId: this.routeId, pickupPoint }).subscribe({
      next: () => {
        // Route assignment succeeded -- now add the fee due. This step must not be
        // swallowed on failure: a missing transport fee is a billing-correctness bug,
        // not cosmetic, and the mapping has already been committed at this point.
        this.feesService.addAdHocDue(student.id, {
          classId: student.classId!,
          amount: route.monthlyFee ?? 0,
          periodLabel: route.name,
          description: CURRENT_ACADEMIC_YEAR,
        }).subscribe({
          next: () => {
            this.addingStudentId.set(null);
            this.addOk.set(true);
            this.addMsg.set(`${student.fullName} added to the route and the monthly fee due was added to their ledger.`);
            this.pickupPoint = '';
            this.loadMappings();
          },
          error: (err) => {
            this.addingStudentId.set(null);
            this.addOk.set(false);
            this.addMsg.set(
              `${student.fullName} was added to the route, but the fee due could not be added: ` +
              this.msg(err, 'unknown error') +
              '. Their pending total was NOT increased -- retry or add the due manually.',
            );
            this.loadMappings();
          },
        });
      },
      error: (err) => {
        this.addingStudentId.set(null);
        this.addOk.set(false);
        this.addMsg.set(this.msg(err, 'Could not add this student to the route.'));
      },
    });
  }

  private msg(err: any, fb: string): string {
    if (err?.status === 0) return 'Cannot reach the server. Check your connection and try again.';
    return err?.error?.errors?.[0] || err?.error?.message || fb;
  }
}
