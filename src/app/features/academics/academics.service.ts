import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';

export interface Subject {
  id: string;
  name: string;
  code?: string;
  classId?: string;
  syllabusOutline?: string | null;
  [key: string]: unknown;
}

export interface TimetableSlot {
  day: string;
  period: number;
  subjectId: string;
  startTime?: string;
  endTime?: string;
}

export interface Homework {
  id: string;
  title: string;
  description?: string;
  classId?: string;
  sectionId?: string;
  dueDateUtc?: string;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class AcademicsService {
  private api = inject(ApiService);

  listSubjects(classId?: string): Observable<Subject[]> {
    return this.api.get('/api/subjects', { classId });
  }

  createSubject(body: { name: string; code?: string; classId?: string; syllabusOutline?: string }): Observable<Subject> {
    return this.api.post('/api/subjects', body);
  }

  updateSyllabus(subjectId: string, syllabusOutline: string | null): Observable<Subject> {
    return this.api.patch(`/api/subjects/${subjectId}/syllabus`, { syllabusOutline });
  }

  getTimetable(classId: string, sectionId: string): Observable<{ slots: TimetableSlot[] }> {
    return this.api.get('/api/timetables', { classId, sectionId });
  }

  saveTimetable(body: {
    classId: string;
    sectionId: string;
    slots: TimetableSlot[];
  }): Observable<unknown> {
    return this.api.put('/api/timetables', body);
  }

  listHomework(classId?: string, sectionId?: string): Observable<Homework[]> {
    return this.api.get('/api/homework', { classId, sectionId });
  }

  createHomework(body: {
    classId: string;
    sectionId: string;
    subjectId: string;
    title: string;
    description?: string;
    dueDateUtc: string;
  }): Observable<Homework> {
    return this.api.post('/api/homework', body);
  }
}
