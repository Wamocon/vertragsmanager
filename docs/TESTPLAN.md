# Vertragsmanager — Testplan

## Testbenutzer

| E-Mail | Passwort | Rolle | Unternehmen |
|---|---|---|---|
| `superadmin@vertragsmanager.de` | `Test1234!` | Superadmin | — |
| `admin@wamocon.de` | `Test1234!` | Unternehmensadmin | WAMOCON GmbH |
| `manager@wamocon.de` | `Test1234!` | Vertragsmanager | WAMOCON GmbH |
| `leser@wamocon.de` | `Test1234!` | Leser | WAMOCON GmbH |
| `admin@techcorp.de` | `Test1234!` | Unternehmensadmin | TechCorp AG |
| `manager@techcorp.de` | `Test1234!` | Vertragsmanager | TechCorp AG |
| `leser@techcorp.de` | `Test1234!` | Leser | TechCorp AG |

---

## A. Automatisierte Komponententests (Unit/Integration)

Voraussetzung: `npm install -D vitest @testing-library/react @testing-library/jest-dom`

### A.1 UI Komponenten

| ID | Komponente | Test | Erwartung |
|---|---|---|---|
| A1.1 | `Button` | Render mit variant `primary`, `secondary`, `danger`, `ghost` | Korrekte CSS-Klassen, onClick aufgerufen |
| A1.2 | `Input` | Render mit/ohne `error`-Prop | Fehlermeldung wird angezeigt, roter Border |
| A1.3 | `Select` | Render mit Options-Array | Alle Optionen sichtbar, onChange funktioniert |
| A1.4 | `Card` | Render mit `CardHeader`, `CardTitle`, `CardContent` | Korrekt verschachtelt |
| A1.5 | `StatusBadge` | Render mit `active`, `expired`, `expiring_soon`, `cancelled` | Richtige Farbe und Text |
| A1.6 | `Sidebar` | Render mit `unreadCount > 0` | Badge mit Zahl sichtbar |
| A1.7 | `AdminSidebar` | Render | Alle 3 Nav-Links vorhanden (Dashboard, Unternehmen, Benutzer) |

### A.2 Geschäftslogik

| ID | Funktion | Test | Erwartung |
|---|---|---|---|
| A2.1 | `computeMonthlyAmount` | `monthly=100` | `100` |
| A2.2 | `computeMonthlyAmount` | `quarterly=300` | `100` |
| A2.3 | `computeMonthlyAmount` | `yearly=1200` | `100` |
| A2.4 | `computeMonthlyAmount` | `one_time=500` | `0` |
| A2.5 | Vertragsfilter | Suche "Adobe" | Nur Verträge mit "Adobe" im Namen/Anbieter |
| A2.6 | Vertragsfilter | Status "active" | Nur aktive Verträge |
| A2.7 | Vertragsfilter | Kategorie "Software" | Nur Software-Verträge |
| A2.8 | Admin-Benutzerfilter | Rolle "reader" | Nur Leser angezeigt |
| A2.9 | Admin-Benutzerfilter | Rolle "reader" + Suche "Weber" | 0 Ergebnisse + Hinweis "Filter aktiv" |
| A2.10 | Admin-Benutzerfilter | Filter zurücksetzen | Alle Benutzer wieder sichtbar |

### A.3 Supabase RLS (Integrationstests)

| ID | Szenario | Test | Erwartung |
|---|---|---|---|
| A3.1 | Org-Isolation | WAMOCON-User liest TechCorp-Verträge | Leere Ergebnisse (kein Fehler) |
| A3.2 | Org-Isolation | TechCorp-User liest WAMOCON-Mitglieder | Leere Ergebnisse |
| A3.3 | Rollenprüfung | Reader versucht Contract INSERT | RLS-Fehler |
| A3.4 | Rollenprüfung | Reader versucht Contract DELETE | RLS-Fehler |
| A3.5 | Rollenprüfung | Manager kann Contract INSERT | Erfolg |
| A3.6 | Rollenprüfung | Manager versucht Member DELETE | RLS-Fehler |
| A3.7 | Superadmin | Superadmin liest alle Profiles | Alle 7 Profile sichtbar |
| A3.8 | Profil-Sichtbarkeit | User sieht Profil von Org-Kollegen | Sichtbar |
| A3.9 | Profil-Sichtbarkeit | User sieht Profil aus fremder Org | Nicht sichtbar |

---

## B. Manueller E2E-Testplan

### B.1 Authentifizierung & Registrierung

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| B1.1 | Login (Unternehmensadmin) | 1. Öffne `/login` 2. `admin@wamocon.de` / `Test1234!` 3. Klick "Anmelden" | Weiterleitung zu `/dashboard`, 10 WAMOCON-Verträge sichtbar |
| B1.2 | Login (Superadmin) | 1. Öffne `/login` 2. `superadmin@vertragsmanager.de` / `Test1234!` | Weiterleitung zu `/admin` (Superadmin Dashboard) |
| B1.3 | Login (Reader) | `leser@wamocon.de` → `/dashboard` | Dashboard sichtbar, kein "Vertrag erstellen"-Button |
| B1.4 | Login (Manager) | `manager@wamocon.de` → `/dashboard` | Dashboard sichtbar |
| B1.5 | Login falsch | Falsches Passwort eingeben | Fehlermeldung "Invalid login credentials" |
| B1.6 | Registrierung | 1. Öffne `/register` 2. Alle Felder ausfüllen 3. Absenden | Erfolgsseite mit Inbucket-Link (Port 54354) |
| B1.7 | E-Mail-Bestätigung | 1. Registrieren 2. Inbucket öffnen 3. Bestätigungslink klicken | Weiterleitung zu `/dashboard`, Org wird automatisch erstellt |
| B1.8 | Logout | Sidebar → Logout-Button | Weiterleitung zu `/login` |

### B.2 Dashboard

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B2.1 | Übersicht | admin@wamocon.de | KPI-Karten: Aktive Verträge, Monatl. Kosten, Ablaufende, Benachrichtigungen |
| B2.2 | Letzte Verträge | admin@wamocon.de | Liste der neuesten Verträge angezeigt |
| B2.3 | Ungelesene Benachrichtigungen | leser@wamocon.de | Badge in Sidebar zeigt "1" (Willkommens-Nachricht) |
| B2.4 | Org-Isolation | admin@techcorp.de | Nur TechCorp-Verträge sichtbar (5 Stück) |

### B.3 Vertragsverwaltung

| ID | Prozess | User | Schritte | Erwartung |
|---|---|---|---|---|
| B3.1 | Verträge ansehen | admin@wamocon.de | Öffne `/contracts` | 10 Verträge, Karten- und Listenansicht umschaltbar |
| B3.2 | Suche | admin@wamocon.de | Suche "Adobe" | 1 Ergebnis: Adobe Creative Cloud |
| B3.3 | Filter Status | admin@wamocon.de | Filter "Aktiv" | Nur aktive Verträge |
| B3.4 | Filter Kategorie | admin@wamocon.de | Filter "Software & SaaS" | Nur Software-Verträge |
| B3.5 | Sortierung | admin@wamocon.de | Sortiere nach "Kosten" | Höchste Kosten zuerst |
| B3.6 | Vertrag erstellen | admin@wamocon.de | `/contracts/new` → Formular ausfüllen → Speichern | Neuer Vertrag in Liste, Erinnerungen automatisch erstellt |
| B3.7 | Vertrag bearbeiten | admin@wamocon.de | Vertrag öffnen → "Bearbeiten" → Ändern → Speichern | Änderungen übernommen |
| B3.8 | Manager-Sicherheitshinweis | manager@wamocon.de | Vertrag öffnen → "Bearbeiten" → Speichern | Sicherheitshinweis: "Änderungen werden protokolliert" → Bestätigen |
| B3.9 | Vertrag löschen | admin@wamocon.de | Vertrag öffnen → "Löschen" → Bestätigen | Vertrag entfernt |
| B3.10 | Löschen (Reader) | leser@wamocon.de | Vertrag öffnen | Kein "Bearbeiten" und kein "Löschen" Button |
| B3.11 | Löschen (Manager) | manager@wamocon.de | Vertrag öffnen | "Bearbeiten" sichtbar, KEIN "Löschen" |
| B3.12 | Vertrag erstellen (Reader) | leser@wamocon.de | Öffne `/contracts` | Kein "Vertrag erstellen" Button, `/contracts/new` leitet zu `/contracts` weiter |
| B3.13 | Vertragsdetails | admin@wamocon.de | Vertrag anklicken | Details, Erinnerungen, Kommentare angezeigt |

### B.4 Kommentarsystem

| ID | Prozess | User | Schritte | Erwartung |
|---|---|---|---|---|
| B4.1 | Kommentar schreiben | leser@wamocon.de | Vertrag öffnen → Kommentar eintippen → Senden | Kommentar erscheint mit Name und Zeitstempel |
| B4.2 | Kommentar schreiben (Admin) | admin@wamocon.de | Vertrag öffnen → Kommentar schreiben | Kommentar erscheint |
| B4.3 | Benachrichtigung | leser@wamocon.de kommentiert | Admin + Manager erhalten Benachrichtigung | Benachrichtigung in `/notifications` |

### B.5 Kündigungsfristen & Erinnerungen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B5.1 | Fristen-Seite | admin@wamocon.de → `/deadlines` | Kalenderübersicht mit farbcodierten Fristen |
| B5.2 | Erinnerungen ein/aus | admin@wamocon.de → Vertrag → Erinnerungen | Erinnerung aktivieren/deaktivieren möglich |

### B.6 Organisation & Mitgliederverwaltung

| ID | Prozess | User | Schritte | Erwartung |
|---|---|---|---|---|
| B6.1 | Org-Seite | admin@wamocon.de → `/organization` | WAMOCON GmbH, 3 Mitglieder sichtbar mit Rollen |
| B6.2 | Mitglied einladen | admin@wamocon.de | E-Mail + Rolle eingeben → Einladen | Einladung in Tabelle, E-Mail versendet |
| B6.3 | Rollenzuweisung | admin@wamocon.de | Rolle eines Mitglieds ändern | Rolle aktualisiert |
| B6.4 | Org-Seite (Reader) | leser@wamocon.de → `/organization` | Org sichtbar, KEIN Einladen/Ändern-Button |

### B.7 Analytics

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B7.1 | Übersicht | admin@wamocon.de → `/analytics` | Monatliche Kosten, Verteilung nach Kategorie/Status, Verlängerungs-Prognose |
| B7.2 | Nur eigene Org | admin@techcorp.de → `/analytics` | Nur TechCorp-Analytics (5 Verträge) |

### B.8 Profil & Einstellungen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B8.1 | Profil | admin@wamocon.de → `/profile` | Name, E-Mail, Sprache, Firma angezeigt |
| B8.2 | Name ändern | admin@wamocon.de → Name aktualisieren | Gespeichert, sofort sichtbar |
| B8.3 | Theme | `/settings` → Dark Mode | Gesamte App im Dark Mode |
| B8.4 | Theme zurück | `/settings` → Light Mode | Light Mode wieder aktiv |

### B.9 Benachrichtigungen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B9.1 | Benachrichtigungsliste | admin@wamocon.de → `/notifications` | Willkommens-Benachrichtigung sichtbar |
| B9.2 | Als gelesen markieren | Benachrichtigung anklicken/markieren | Badge-Zähler sinkt |

### B.10 Vorlagen

| ID | Prozess | User | Erwartung |
|---|---|---|---|
| B10.1 | E-Mail-Vorlagen | admin@wamocon.de → `/templates` | Kündigungsbrief-Vorlagen für aktive Verträge sichtbar |

---

## C. Superadmin E2E-Tests

### C.1 Admin-Dashboard

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C1.1 | Dashboard | Login als superadmin → `/admin` | KPI-Karten: Gesamt-Unternehmen, Aktive, Gesamt-Benutzer, Inaktive |
| C1.2 | Letzte Unternehmen | `/admin` | Liste der zuletzt registrierten Unternehmen |

### C.2 Unternehmensverwaltung

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C2.1 | Unternehmensübersicht | `/admin/companies` | 2 Unternehmen: WAMOCON GmbH (3 Mitglieder, 10 Verträge), TechCorp AG (3 Mitglieder, 5 Verträge) |
| C2.2 | Unternehmensdetail | Klick auf WAMOCON | Benutzer nach Rolle gruppiert (Unternehmensadmin: Anna Weber, Vertragsmanager: Max Müller, Leser: Lisa Schmidt), Verträgsliste |
| C2.3 | Unternehmen deaktivieren | "Deaktivieren" klicken | Status wechselt zu "Inaktiv", Button wechselt zu "Aktivieren" |
| C2.4 | Unternehmen aktivieren | "Aktivieren" klicken | Status wechselt zu "Aktiv" |

### C.3 Benutzerverwaltung

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C3.1 | Benutzerübersicht | `/admin/users` | 6 Benutzer (ohne Superadmin selbst), mit Name, E-Mail, Unternehmen, Rolle, Status |
| C3.2 | Suche | "Weber" eingeben | 1 Ergebnis: Anna Weber |
| C3.3 | Filter: Rolle | "Leser" auswählen | 2 Ergebnisse: Lisa Schmidt, Peter Braun |
| C3.4 | Filter: Unternehmen | "WAMOCON GmbH" auswählen | 3 Ergebnisse |
| C3.5 | Filter: Status | "Aktiv" auswählen | Nur aktive Benutzer |
| C3.6 | Filter + Suche | Filter "TechCorp" + Suche "Weber" | 0 Ergebnisse + Hinweis: "es gibt Treffer für Weber, aber diese werden durch aktive Filter ausgeblendet" |
| C3.7 | Filter zurücksetzen | "Filter zurücksetzen" klicken | Alle 6 Benutzer sichtbar |
| C3.8 | Benutzer deaktivieren | "Deaktivieren" bei einem User | Status wechselt zu "Inaktiv" |
| C3.9 | Passwort zurücksetzen | "Passwort zurücksetzen" → neues PW eingeben → OK | Bestätigung, User kann mit neuem PW anmelden |

### C.4 Rollenbasierte Zugangskontrolle (Admin-Bereich)

| ID | Prozess | Schritte | Erwartung |
|---|---|---|---|
| C4.1 | Admin-URL als normaler User | `admin@wamocon.de` → `/admin` | Weiterleitung zu `/dashboard` |
| C4.2 | Superadmin auf App-URL | `superadmin@vertragsmanager.de` → `/dashboard` | Weiterleitung zu `/admin` |
| C4.3 | Nicht eingeloggt → `/admin` | Ohne Login `/admin` aufrufen | Weiterleitung zu `/login` |

---

## D. Cross-Cutting Concerns

| ID | Thema | Test | Erwartung |
|---|---|---|---|
| D1 | Dark Mode | Alle Seiten im Dark Mode durchklicken | Kein Weißblitz, konsistente Farben |
| D2 | Responsive Mobile | Browser auf 375px Breite | Sidebar eingeklappt, Tabellen scrollbar |
| D3 | i18n DE | App auf Deutsch | Alle Labels, Buttons, Fehlermeldungen auf Deutsch |
| D4 | Legal Footer | Homepage → Footer | Links zu Impressum, Datenschutz, AGB funktionieren |
| D5 | 404-Seite | `/nonexistent` aufrufen | 404-Seite angezeigt |
| D6 | Org-Isolation gesamt | Als WAMOCON-User: keine TechCorp-Daten sichtbar | Strikt getrennt in allen Modulen |
