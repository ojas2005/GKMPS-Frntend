import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

// A period slot in a class timetable (shared with the manual editor / student view).
export interface TimetableSlot {
  day: string;
  period: number;
  subjectId?: string | null;
  subjectName?: string | null;
  teacherStaffId?: string | null;
  startTime: string;
  endTime: string;
}

export interface ClassTimetable {
  id: string;
  classId: string;
  sectionId: string;
  slots: TimetableSlot[];
  effectiveFromUtc: string;
}

// One teacher's config row: subject, daily cap, and the classes they cover.
export interface TeacherAssignment {
  staffId: string;
  subjectName: string;
  maxPeriodsPerDay: number;
  classIds: string[];
}

export interface PrePrimaryAssignment {
  classId: string;
  classTeacherStaffId: string;
  subjectName?: string | null;
}

export interface ScheduleConfig {
  junior: TeacherAssignment[];
  senior: TeacherAssignment[];
  prePrimary: PrePrimaryAssignment[];
}

export interface GenerateResult {
  generatedClassIds: string[];
  warnings: string[];
}

export interface TeacherSlot {
  day: string;
  period: number;
  classId: string;
  sectionId: string;
  subjectName?: string | null;
  startTime: string;
  endTime: string;
}

export interface TeacherTimetable {
  staffId: string;
  slots: TeacherSlot[];
}

@Injectable({ providedIn: 'root' })
export class TimetableService {
  private api = inject(ApiService);

  // ---- Owner config + generation (admin) ----
  getConfig(): Observable<ScheduleConfig> {
    return this.api.get('/api/timetables/config');
  }

  saveConfig(body: ScheduleConfig): Observable<unknown> {
    return this.api.put('/api/timetables/config', body);
  }

  generate(): Observable<GenerateResult> {
    return this.api.post('/api/timetables/generate');
  }

  // ---- Views ----
  // A class's timetable (student sees their own; server enforces scoping).
  getForClass(classId: string, sectionId: string): Observable<ClassTimetable> {
    return this.api.get('/api/timetables', { classId, sectionId });
  }

  // The logged-in teacher's own schedule across every class.
  getForTeacher(): Observable<TeacherTimetable> {
    return this.api.get('/api/timetables/teacher/me');
  }
}
