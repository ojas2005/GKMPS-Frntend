import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/http/api.service';
import { DownloadLink } from '../../core/models/api-response';

export interface Exam {
  id: string;
  name: string;
  classId?: string;
  examDateUtc?: string;
  maxMarks?: number;
  isPublished?: boolean;
  [key: string]: unknown;
}

export interface StudentResult {
  examId: string;
  examName: string;
  subjectId: string;
  examDateUtc: string;
  marksObtained: number;
  maxMarks: number;
  passingMarks: number;
  grade?: string | null;
  isResultPublished: boolean;
}

export interface ExamStats {
  average: number;
  rankings: Array<{ studentId: string; studentName?: string; marks: number; rank: number }>;
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class ExaminationService {
  private api = inject(ApiService);

  list(classId?: string): Observable<Exam[]> {
    return this.api.get('/api/exams', { classId });
  }

  create(body: {
    name: string;
    classId: string;
    subjectId: string;
    examDateUtc: string;
    maxMarks: number;
    passingMarks: number;
  }): Observable<Exam> {
    return this.api.post('/api/exams', body);
  }

  publish(examId: string): Observable<unknown> {
    return this.api.post(`/api/exams/${examId}/publish`);
  }

  stats(examId: string): Observable<ExamStats> {
    return this.api.get(`/api/exams/${examId}/stats`);
  }

  reportCard(examId: string, studentId: string): Observable<DownloadLink> {
    return this.api.get(`/api/exams/${examId}/students/${studentId}/report-card`);
  }

  // All results for one student (a student sees only their own published results).
  studentResults(studentId: string): Observable<StudentResult[]> {
    return this.api.get(`/api/exams/students/${studentId}/results`);
  }

  addMarks(
    examId: string,
    body: { studentId: string; subjectId: string; marks: number },
  ): Observable<unknown> {
    return this.api.post(`/api/exams/${examId}/marks`, body);
  }

  correctMarks(examId: string, marksEntryId: string, marks: number): Observable<unknown> {
    return this.api.patch(`/api/exams/${examId}/marks/${marksEntryId}`, { marks });
  }
}
