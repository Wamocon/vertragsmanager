# Vertragsmanager — Implementierungsfortschritt V1

**Stand:** 2025-07-15  
**Status:** V1 Kernfunktionen implementiert — bereit zum manuellen Testen

---

## Zusammenfassung

Alle V1-Module aus dem Anforderungsdokument (Abschnitt 7) wurden als funktionsfähige Next.js-Seiten implementiert. Die App nutzt eine lokale Supabase-Instanz (Docker) mit vollständigem Datenbankschema, RLS-Policies und realistischen Testdaten.

---

## Technologie-Stack

| Komponente | Technologie | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.1 |
| Sprache | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS | v4 |
| Backend/DB | Supabase (lokal, Docker) | CLI 2.91.2 |
| i18n | next-intl | DE + EN |
| Icons | lucide-react | — |
| Charts | recharts | — |
| Datumsberechnung | date-fns | — |

---

## Lokale Supabase-Konfiguration

Die lokale Instanz läuft auf eigenen Ports, um Konflikte mit anderen Supabase-Projekten zu vermeiden:

| Service | Port |
|---|---|
| API (PostgREST) | 54351 |
| PostgreSQL | 54352 |
| Studio | 54353 |
| Inbucket (E-Mail) | 54354 |
| Analytics | 54357 |
| Inspector | 8093 |

**Zugang:**
- Studio: http://127.0.0.1:54353
- Inbucket (E-Mail): http://127.0.0.1:54354
- API: http://127.0.0.1:54351

---

## Implementierte Module (V1)

### ✅ Vertragsverwaltung (VE-01 bis VE-09)
- Vertragsübersicht mit Karten- und Listenansicht
- Suche nach Name, Anbieter, Kategorie
- Filter nach Kategorie und Status
- Sortierung (Name, Kosten, Frist, Anbieter)
- Vertragsdetailseite mit allen Feldern
- Vertrag erstellen, bearbeiten, löschen
- Erinnerungen pro Vertrag aktivieren/deaktivieren
- **Seiten:** `/contracts`, `/contracts/new`, `/contracts/[id]`

### ✅ Dashboard & Analytik (NV-02, KO-01 bis KO-08)
- KPI-Karten: Gesamtverträge, Monats-/Jahreskosten, anstehende Fristen
- Kosten nach Kategorie (PieChart)
- Top-Anbieter (Balkendiagramm)
- Zahlungskalender (12 Monate)
- CSV-Export der Analysedaten
- **Seiten:** `/dashboard`, `/analytics`

### ✅ Fristen & Erinnerungen (FR-01 bis FR-08)
- Fristenliste gruppiert nach Dringlichkeit (überfällig/diese Woche/dieser Monat/später)
- Tage bis Frist berechnet und angezeigt
- .ics Kalender-Export für einzelne Fristen
- Farbcodierung nach Dringlichkeit
- **Seite:** `/deadlines`

### ✅ Kündigungsvorlagen (KV-01 bis KV-06)
- 4 Vorlagentypen: Ordentliche Kündigung, Sonderkündigung, Nichtverlängerung, Außerordentliche Kündigung
- Vertrag auswählen → Vorlage wird automatisch befüllt
- Download als Textdatei
- Rechtlicher Hinweis zu juristischer Beratung
- **Seite:** `/templates`

### ✅ Benachrichtigungen (FR-05, BN-01, BN-02)
- In-App-Benachrichtigungszentrale
- Einzeln als gelesen markieren
- Alle als gelesen markieren
- Unread-Badge in Sidebar
- **Seite:** `/notifications`

### ✅ Profil & Datenschutz (PR-01, PR-02, DS-01 bis DS-05)
- Profilbearbeitung (Name, Firma)
- DSGVO-Datenexport (JSON)
- **Seite:** `/profile`

### ✅ Einstellungen (NV-03, SP-01)
- Theme-Umschaltung: Hell / Dunkel / System
- Sprachanzeige
- **Seite:** `/settings`

### ✅ Organisationsverwaltung (OV-01 bis OV-04)
- Mitgliederliste mit Rollen (Admin/Member/Viewer)
- Mitglieder per E-Mail einladen
- Rollen ändern
- Mitglieder entfernen
- Ausstehende Einladungen anzeigen
- Audit-Log (letzte Aktionen)
- **Seite:** `/organization`

### ✅ Authentifizierung (AU-01 bis AU-04)
- Login mit E-Mail/Passwort (Supabase Auth)
- Registrierung mit automatischer Demo-Daten-Erstellung
- Middleware-basierter Routenschutz
- Logout über Sidebar
- **Seiten:** `/login`, `/register`

### ✅ Rechtliche Seiten (RE-01)
- Impressum (WAMOCON GmbH)
- Datenschutzerklärung (DSGVO-konform)
- AGB
- **Seiten:** `/legal/imprint`, `/legal/privacy`, `/legal/terms`

### ✅ Landingpage
- Hero-Section mit CTA
- Feature-Grid (6 Features)
- Preistabelle (4 Stufen: Free/Starter/Pro/Business)
- Footer mit rechtlichen Links
- **Seite:** `/`

---

## Datenbankschema

### Tabellen (9)
| Tabelle | Zweck |
|---|---|
| `organizations` | Organisationen (Multi-Tenant) |
| `organization_members` | Mitglieder mit Rollen |
| `profiles` | Benutzerprofile (via Trigger bei Registrierung) |
| `categories` | Vertragskategorien (7 System-Kategorien) |
| `contracts` | Verträge mit allen V1-Feldern |
| `reminders` | Erinnerungen pro Vertrag |
| `notifications` | In-App-Benachrichtigungen |
| `invitations` | E-Mail-Einladungen |
| `audit_log` | Aktionsprotokoll |

### RLS-Policies
Alle Tabellen haben Row-Level-Security aktiviert. Zugriff ist auf die eigene Organisation beschränkt.

### Trigger
- `handle_new_user`: Erstellt automatisch ein Profil bei Registrierung
- `compute_cancellation_deadline`: Berechnet Kündigungsfrist bei Vertragsänderung
- `auto_update_contract_status`: Aktualisiert Vertragsstatus basierend auf Enddatum
- `create_default_reminders`: Erstellt Standard-Erinnerungen bei neuem Vertrag

### Seed-Daten
Die Funktion `setup_demo_data(user_id, org_name)` wird bei der Registrierung aufgerufen und erstellt:
- 1 Organisation mit dem Benutzer als Admin
- 7 System-Kategorien (Software, Cloud, Telekommunikation, Versicherung, Immobilien, Fahrzeuge, Marketing)
- 15 realistische Demo-Verträge (Microsoft 365, Adobe CC, Slack, GitHub, Jira, Vercel, Telekom, Vodafone, Allianz, HDI, Büro-Miete, BMW Leasing, Google Workspace, HubSpot, DATEV)

---

## Build-Status

| Check | Status |
|---|---|
| TypeScript (`npm run typecheck`) | ✅ 0 Fehler |
| ESLint (`npm run lint`) | ✅ 0 Fehler (4 Warnings) |
| Build (`npm run build`) | ✅ Erfolgreich |
| Dev Server (`npm run dev`) | ✅ Läuft auf Port 3001 |

---

## Bekannte Einschränkungen & Offene Punkte

### Noch nicht implementiert (V1-Scope, aber komplexere Integration nötig)

| Feature | Anforderungs-ID | Grund |
|---|---|---|
| Dokumenten-Upload mit OCR | DO-01 bis DO-12 | Erfordert Azure Document Intelligence API-Key und Storage-Bucket-Konfiguration |
| E-Mail-Erinnerungen | FR-04 | Erfordert E-Mail-Service (z. B. Resend, SendGrid) |
| PDF/DOCX-Generierung für Kündigungsvorlagen | KV-05, KV-06 | `docx`-Package installiert, aber Export-Logik noch nicht verdrahtet (aktuell nur .txt) |
| Stripe-Zahlungsintegration | RE-04 | Erfordert Stripe-Account und API-Keys |
| Cookie-Banner | RE-02 | Kann als separate Komponente nachgerüstet werden |
| Zwei-Faktor-Authentifizierung | AU-05 | Supabase MFA-Konfiguration erforderlich |

### Technische Hinweise

1. **Middleware-Deprecation:** Next.js 16 hat `middleware.ts` zugunsten von `proxy.ts` deprecated. Die aktuelle Middleware funktioniert, sollte aber bei Gelegenheit migriert werden.
2. **Supabase-Typen:** Die Supabase-Client-Erstellung nutzt aktuell keine generischen DB-Typen (`Database`), um Kompatibilitätsprobleme mit `@supabase/ssr` zu vermeiden. Typsicherheit wird über die Interface-Definitionen in `src/types/database.ts` gewährleistet.
3. **Theme-Switching:** Implementiert via `localStorage` und `dark`-CSS-Klasse. Kein serverseitiges Cookie — bei Seitenneuladen kann es zu einem kurzen Flash kommen.

---

## Testanleitung

### Voraussetzungen
- Docker läuft
- Lokale Supabase ist gestartet (`npx supabase start` im Projektverzeichnis)

### Schritte
1. `npm run dev` — Dev-Server starten
2. http://localhost:3001 öffnen — Landingpage prüfen
3. "Registrieren" klicken → E-Mail und Passwort eingeben
4. Inbucket öffnen (http://127.0.0.1:54354) → Bestätigungsmail finden und Link klicken
5. Einloggen → Dashboard mit 15 Demo-Verträgen sollte erscheinen
6. Alle Module durchklicken und Funktionalität prüfen

### Supabase Studio
- http://127.0.0.1:54353 — Tabellen, Daten, Auth-Benutzer direkt einsehen

---

## Dateistruktur (Übersicht)

```
src/
├── app/
│   ├── (app)/                    # Authentifizierter Bereich
│   │   ├── analytics/            # Kostenanalyse
│   │   ├── contracts/            # Vertragsverwaltung
│   │   │   ├── [id]/             # Vertragsdetail
│   │   │   └── new/              # Neuer Vertrag
│   │   ├── dashboard/            # Dashboard
│   │   ├── deadlines/            # Fristenverwaltung
│   │   ├── notifications/        # Benachrichtigungen
│   │   ├── organization/         # Organisationsverwaltung
│   │   ├── profile/              # Profil
│   │   ├── settings/             # Einstellungen
│   │   ├── templates/            # Kündigungsvorlagen
│   │   └── layout.tsx            # App-Shell mit Sidebar
│   ├── legal/                    # Rechtliche Seiten
│   ├── login/                    # Login
│   ├── register/                 # Registrierung
│   ├── layout.tsx                # Root-Layout
│   ├── page.tsx                  # Landingpage
│   └── globals.css               # Globale Styles
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx           # Navigation
│   └── ui/                       # Wiederverwendbare UI-Komponenten
├── lib/
│   ├── supabase/                 # Supabase-Client-Utilities
│   └── utils.ts                  # cn() Helper
├── messages/
│   ├── de.json                   # Deutsche Übersetzungen
│   └── en.json                   # Englische Übersetzungen
├── i18n/
│   └── request.ts                # next-intl Konfiguration
├── types/
│   └── database.ts               # TypeScript-Interfaces
└── middleware.ts                  # Route-Schutz
supabase/
├── config.toml                   # Lokale Supabase-Konfiguration
├── migrations/
│   └── 20260416120000_initial_schema.sql  # Datenbankschema
└── seed.sql                      # Demo-Daten-Funktion
```
