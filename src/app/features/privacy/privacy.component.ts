import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { privacyContact } from '../../core/config/runtime-config';

/**
 * The privacy notice India's DPDP Act asks for: what the portal keeps, why, where, for how
 * long, and how families use their rights. Public, so it can be read before signing in.
 * Keep it in step with docs/DATA-RETENTION.md in the backend repository.
 */
@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="min-h-screen bg-neutral-50 px-4 py-10">
      <article class="mx-auto max-w-3xl rounded-xl bg-white p-6 sm:p-10 shadow-sm border border-neutral-200 text-neutral-700 leading-relaxed">
        <a routerLink="/auth/login" class="text-sm text-primary-700 hover:underline">&larr; Back to sign in</a>
        <h1 class="mt-4 text-2xl font-semibold text-neutral-900">Privacy notice</h1>
        <p class="mt-1 text-sm text-neutral-500">GKMPS School Portal &middot; last updated 19 September 2026</p>

        <p class="mt-6">
          The school uses this portal to run admissions, classes, attendance, exams, fees and
          certificates. This notice explains what it keeps about pupils, parents and staff, and
          your rights under India's Digital Personal Data Protection Act, 2023.
        </p>

        <h2 class="mt-8 text-lg font-semibold text-neutral-900">What we keep, and why</h2>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li><strong>Pupils:</strong> name, date of birth, gender, admission number, class, address,
            attendance, marks and report cards, fees and payments, transfer certificates &mdash; to teach,
            assess and look after your child and to run the school's accounts.</li>
          <li><strong>Parents:</strong> name, email and phone number &mdash; to give you access to your
            child's records and to contact you.</li>
          <li><strong>Staff:</strong> name, contact details, subjects and classes &mdash; to organise teaching.</li>
          <li><strong>Everyone who signs in:</strong> login ID, a scrambled (hashed) password, and a record
            of sign-ins and changes with the device's IP address &mdash; to keep accounts secure and to
            investigate misuse.</li>
        </ul>
        <p class="mt-3">
          We use this information only for running the school. We don't sell it, show advertising
          or track you across other websites. The portal uses no analytics or advertising cookies;
          your browser only stores what keeps you signed in.
        </p>

        <h2 class="mt-8 text-lg font-semibold text-neutral-900">Where it is stored</h2>
        <p class="mt-3">
          The portal runs on Microsoft Azure (South Korea). Its database is on TiDB Cloud (Japan),
          and encrypted backups are stored with GitHub. The data is therefore stored outside India,
          which the law allows. Connections are encrypted, and only school staff whose role
          requires it can see each record.
        </p>

        <h2 class="mt-8 text-lg font-semibold text-neutral-900">How long we keep it</h2>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>A pupil's records are kept while they are at the school. After they leave, the school
            can erase their personal details. Marks and attendance are then kept under the
            admission number only, and fee records for the school's accounts.</li>
          <li>Sign-in sessions: 30 days after they end. The security record of sign-ins and changes:
            about 13 months. Backups: 90 days.</li>
        </ul>

        <h2 class="mt-8 text-lg font-semibold text-neutral-900">Your rights</h2>
        <p class="mt-3">You can ask to:</p>
        <ul class="mt-3 list-disc space-y-2 pl-6">
          <li>see the information we hold about you or your child (most of it is on the portal already);</li>
          <li>have it corrected if it is wrong;</li>
          <li>have it erased once your child has left the school;</li>
          <li>name someone to act for you if you are unable to.</li>
        </ul>
        <p class="mt-3">
          If the portal's data is ever exposed to someone it shouldn't be, we will tell the people
          affected and the Data Protection Board of India.
        </p>

        <h2 class="mt-8 text-lg font-semibold text-neutral-900">Questions and complaints</h2>
        <p class="mt-3">
          Contact <strong>{{ contact }}</strong>. We aim to reply within a few days, and within 90 days
          at the latest. If you are not satisfied with the answer, you can complain to the Data
          Protection Board of India.
        </p>
      </article>
    </main>
  `,
})
export class PrivacyComponent {
  readonly contact = privacyContact();
}
