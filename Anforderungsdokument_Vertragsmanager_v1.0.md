# Anforderungsdokument Vertragsmanager
## Softwareprojekt Welle 6

---

| | |
|---|---|
| **Projekt** | Vertragsmanager |
| **Unternehmen** | WAMOCON GmbH |
| **App Version** | 1 |
| **Erstellt von** | Daniel Moretz |
| **Eingereicht an** | Waleri Moretz (Geschäftsführung) |
| **Datum** | 14. April 2026 |
| **Vertraulichkeit** | Intern vertraulich |
| **Status** | Zur Freigabe eingereicht |

---

## 1. Zusammenfassung

### 1.1 Die Idee

**Vertragsmanager** ist eine webbasierte SaaS-Plattform für kleine und mittlere Unternehmen im DACH-Raum. Sie löst ein strukturelles und täglich spürbares Problem: Wer ein Unternehmen führt oder verwaltet, hat Dutzende laufende Abonnements, Verträge und Lizenzen — verteilt auf E-Mail-Postfächer, PDF-Ordner, Schubladenarchive und das Gedächtnis einzelner Mitarbeiter. Kündigungsfristen werden verpasst, Abos laufen jahrelang ungenutzt weiter, und niemand hat einen vollständigen Überblick über die tatsächlichen monatlichen Kosten.

Vertragsmanager löst dieses Problem mit einem klaren Dreischritt: Ein Dokument fotografieren oder hochladen, automatisch die Kerndaten per OCR extrahieren lassen, und sofort in einer übersichtlichen Zentrale verwalten — inklusive proaktiver Erinnerungen vor Kündigungsfristen, konfigurierbarer Kosten-Dashboards und rechtskonformer Kündigungsvorlagen für den DACH-Raum.

### 1.2 Warum jetzt?

Im Jahr 2025 nutzt ein durchschnittliches deutsches KMU mit 10 bis 250 Mitarbeitenden im Median **34 verschiedene SaaS-Abonnements** gleichzeitig — Tendenz stark steigend (Bitkom, 2025). Die Gesamtausgaben für Software-Abonnements im DACH-KMU-Segment werden für 2025 auf **18,7 Milliarden Euro** geschätzt.

Das Kernproblem ist gut dokumentiert: Branchenstudien zeigen, dass Unternehmen im Schnitt 17 bis 23 Prozent ihrer Abo-Ausgaben für ungenutzte oder redundante Dienste aufwenden (C+R Research, 2024). Bei einem typischen KMU mit 50.000 Euro Jahresausgaben für Software sind das bis zu 11.500 Euro verbranntes Budget — ohne jedes strategische Bewusstsein.

Gleichzeitig haben Großanbieter wie Adobe, Microsoft und Salesforce ihre Lizenzpreise 2024/25 um 10 bis 25 Prozent erhöht. Konjunktureller Druck und explodierende Softwarekosten zwingen KMU dazu, Ausgaben aktiv zu steuern. Ein DSGVO-natives, DACH-fokussiertes Tool, das dieses Problem elegant und ohne Einarbeitungsaufwand löst, findet heute einen reifen, zahlungsbereiten Markt.

Parallel dazu treiben regulatorische Rahmen wie die CSRD und das Lieferkettensorgfaltspflichtengesetz (LkSG) den Bedarf nach strukturierter Vertragsdokumentation in die Höhe. Unternehmen müssen nachweisen können, welche Dienstleister sie nutzen, unter welchen Bedingungen und seit wann. Vertragsmanager liefert diese Basis.

---

## 2. Marktanalyse: Fokus DACH

### 2.1 KMU-Softwarelandschaft und Zielgruppe

Deutschland hat rund **3,5 Millionen KMU** — definiert als Unternehmen mit weniger als 250 Mitarbeitenden. Sie beschäftigen 55 Prozent aller sozialversicherungspflichtig Beschäftigten und erzielen 35 Prozent des gesamten Umsatzes in Deutschland. Österreich und die Schweiz ergänzen den DACH-Raum mit weiteren 600.000 KMU.

Nicht alle 3,5 Millionen KMU sind sofortige Zielkunden. Wer kein einziges SaaS-Abo hat, braucht Vertragsmanager nicht. Wer ausschließlich einmalige Softwarelizenzen nutzt und keine laufenden Verträge verwaltet, hat keinen unmittelbaren Leidensdruck. Die realistische Kernzielgruppe sind KMU, die **mindestens fünf laufende digitale Abonnements oder Verträge** gleichzeitig verwalten — das betrifft heute schätzungsweise **2,1 bis 2,6 Millionen Unternehmen** im DACH-Raum, wachsend auf 3 bis 4 Millionen bis 2028.

Quellen: Bitkom Digitalatlas 2025, Statistisches Bundesamt 2025, IFM Bonn 2024

### 2.2 Wachstum des SaaS-Marktes und was das bedeutet

Der globale SaaS-Markt wuchs 2024 auf 317 Milliarden US-Dollar und wird bis 2030 auf über 820 Milliarden US-Dollar prognostiziert (Gartner, 2025). Im DACH-Raum steigt die SaaS-Adoptionsrate jährlich um 18 bis 22 Prozent.

Was das für Vertragsmanager bedeutet: Jedes neue SaaS-Abo ist ein weiterer Eintrag, der in eine Vertragsliste gehört. Je mehr Abonnements ein KMU abschließt, desto dringlicher wird die Verwaltungsfrage. Vertragsmanager wird mit jeder neuen Softwareneueinführung im Markt wertvoller — nicht weniger. Das ist eine strukturelle Wachstumsdynamik, die unabhängig von einzelnen Projekten wirkt.

Gleichzeitig steigen die Stornierungskosten: Adobe, Microsoft und Salesforce haben Jahresabos mit automatischer Verlängerung und Kündigungsfristen von 30 bis 90 Tagen als Standard etabliert. Ein verpasstes Kündigungsdatum bedeutet unmittelbar einen weiteren Jahresbeitrag — oft zwischen 500 und 5.000 Euro je Abo.

Quellen: Gartner Forecast 2025, Bitkom SaaS-Studie DACH 2024, Statista Cloud-Software-Markt 2025

### 2.3 Das Kernproblem: Fragmentiertes Vertragsmanagement

Fragmentierung bezeichnet den Zustand, in dem zusammengehörige Information auf viele unverbundene Orte verteilt ist. Im KMU-Vertragsmanagement bedeutet das: Jeder Vertrag kommt von einem anderen Anbieter, landet in einem anderen E-Mail-Postfach und wird in einer anderen Schublade oder auf einem anderen Laufwerk abgelegt. Es gibt keine Zentrale.

Das erzeugt sechs konkrete Probleme für jede Unternehmensführung:

**Intransparente Gesamtkosten:** Die meisten KMU-Inhaber können nicht aus dem Stegreif sagen, was sie monatlich für Software ausgeben. Addiert man alle Einzel-Abos, ist das Ergebnis regelmäßig überraschend — im negativen Sinne.

**Verpasste Kündigungsfristen:** Abonnements mit automatischer Verlängerung und 30- bis 90-tägigen Fristen verlängern sich still, wenn niemand aktiv widerruft. Forrester (2023) dokumentiert, dass Unternehmen im ersten Monat nach Einführung eines CLM-Tools durchschnittlich 2,3 bis dahin unbekannte oder ungenutzte Verträge entdecken.

**Veraltete Lizenzzahlen:** Mitarbeiterbewegungen führen dazu, dass für ausgeschiedene oder nie aktive Mitarbeitende weiterhin Lizenzen bezahlt werden. Gartner (2024) schätzt, dass Unternehmen durchschnittlich nur 47 Prozent der Softwarelizenzen nutzen, für die sie zahlen.

**Fehlende Dokumentation:** Regulatorische Anforderungen (DSGVO, LkSG, CSRD) verlangen, dass Unternehmen nachweisen können, welche Dienstleister sie beauftragen und unter welchen Datenschutzbedingungen. Diese Nachweise liegen selten strukturiert vor.

**Personenabhängiges Wissen:** Wer ist für welchen Vertrag zuständig? Wenn die Office-Managerin das Unternehmen verlässt, geht das institutionelle Vertragswissen mit ihr. Ein Tool schafft Institutionalisierung.

**Mangelnde Verhandlungsbasis:** Wer nicht weiß, seit wann er wie viel zahlt, kann nicht kompetent nachverhandeln. Vertragsmanager liefert die Datenbasis für jedes Preisgespräch.

Zum Vergleich: Die kaufmännische Buchhaltung war vor 30 Jahren genauso fragmentiert. Erst ERP-Systeme und dann cloudbasierte Buchhaltungstools lösten das. Im Vertragsmanagement stehen KMU heute genau an diesem Wendepunkt.

Quellen: Gartner CLM-Studie 2024, Forrester TEI-Studie 2023, C+R Research Consumer Subscription Survey 2024

### 2.4 Regulatorischer Rückenwind

Mehrere regulatorische Entwicklungen treiben den Bedarf nach strukturiertem Vertragsmanagement direkt:

**DSGVO (seit 2018, Bußgelddurchsetzung ab 2020):** Jedes Unternehmen muss nachweisen können, welche Drittanbieter personenbezogene Daten verarbeiten. Auftragsverarbeitungsverträge (AVV) müssen geführt und aktuell gehalten werden. Ohne Vertragszentrale ist dieser Nachweis kaum erbringbar.

**LkSG (in Kraft seit Januar 2023):** Unternehmen ab 1.000 Mitarbeitenden müssen Sorgfaltspflichten in der Lieferkette nachweisen, was den Druck auf Lieferanten aller Größen erhöht, Vertragsbeziehungen strukturiert zu dokumentieren.

**CSRD (Corporate Sustainability Reporting Directive, ab 2025 für große, ab 2026 für mittlere Unternehmen):** Nachhaltigkeitsberichterstattung erfordert eine vollständige Übersicht über Dienstleister und deren Konditionen — das setzt strukturiertes Vertragsmanagement voraus.

**EU AI Act (vollständig anwendbar ab August 2026):** Wer KI-basierte Dienstleistungen einkauft oder einsetzt, muss deren vertragliche Grundlage und Risikoklassifikation dokumentieren können.

Keiner dieser regulatorischen Treiber erfordert das Kauf eines CLM-Tools. Aber jeder einzelne setzt voraus, was ein fehlendes Tool systematisch verhindert: einen vollständigen, zuverlässigen Überblick über alle Vertragsbeziehungen.

Quellen: EU-DSGVO Art. 30, LkSG §3, CSRD-Richtlinie 2022/2464, EU AI Act 2024

---

## 3. Wettbewerb

### 3.1 Spezialisierte CLM-Anbieter: Stärken und strukturelle Schwächen

Spezialisierte Anbieter für Contract Lifecycle Management existieren, sind aber entweder auf Enterprise-Kundschaft ausgerichtet oder decken zentrale Funktionen wie OCR oder proaktive Fristerinnerungen nicht ab. Das schafft einen strukturellen Interessenkonflikt: Ihre Komplexität und ihr Preismodell passen nicht zu KMU.

| Anbieter | Reichweite | Stärke des Anbieters | Schwäche und Chance für Vertragsmanager |
|---|---|---|---|
| **DocuSign CLM** | Global, Enterprise | Marktführer E-Signatur, starke Vertragsworkflows, Salesforce-Integration | Ab 25 USD pro Nutzer/Monat, komplexe Einrichtung, kein OCR-Upload, keine KMU-Positionierung, US-Hosting |
| **Ironclad** | US-fokussiert | Starke KI-Klauselanalyse, modernes UX | Enterprise-only (ab 2.000 USD/Monat), kein DACH-Fokus, kein DSGVO-natives Hosting, keine Kündigunsvorlagen DE/AT |
| **Vertragsheld (DE)** | DACH | Deutschsprachig, Vertragsvorlagen, bekannt bei Kanzleien | Kein proaktives Fristmanagement, keine Kostenanalytik, kein OCR-Upload, veraltet in UX und Funktionsumfang |
| **PandaDoc** | Global | Einfache Nutzung, E-Signatur, Templates | US-Hosting (DSGVO-Grauzone), kein DACH-spezifisches Rechtsformat, kein Fristmanagement, kein Kostenüberblick |

Das gemeinsame Muster: Kein einziger Anbieter kombiniert OCR-basierten Schnellerfassung, proaktives Kündigungsfrist-Management und Kostenanalytik in einem DSGVO-nativ betriebenen, auf DACH-KMU zugeschnittenen Produkt. Das ist die Marktöffnung für Vertragsmanager.

### 3.2 Indirekte Anbieter: Warum sie die Lücke nicht schließen

Indirekte Anbieter decken Teilprobleme ab, aber keiner schließt die Lücke vollständig:

| Anbieter | Was er bietet | Was fehlt und warum das eine Chance ist |
|---|---|---|
| **Spendflo / Tronity** | SaaS-Spend Management, Kostenübersicht | Enterprise-Preis (ab 500 EUR/Monat), kein OCR, kein proaktives Fristmanagement, US-Hosting |
| **Genuity** | IT-Spend-Übersicht für KMU (US) | Nur auf US-Markt, keine DSGVO-Konformität, keine Kündigungsvorlagen, keine DACH-Lokalisierung |
| **Lexoffice / sevDesk** | Buchhaltung mit rudimentären Vertragsfeldern | Kein dediziertes Vertragsmanagement, kein OCR-Upload, kein Fristmanagement, kein Kostendashboard |
| **Microsoft SharePoint** | Dokumentenverwaltung | Keine intelligente Extraktion, keine Erinnerungen, kein Kostentracking — erfordert manuelle Pflege |
| **Excel / Google Sheets** | Flexibel, bekannt | Fehleranfällig, kein OCR, keine Automatisierung, keine Mandantentrennung, kein Rollenkonzept |

Die Marktlücke: Es gibt heute kein DSGVO-natives, DACH-fokussiertes Produkt, das OCR-basierte Dokumentenerfassung, proaktives Fristmanagement mit Kündigungsvorlagen und strukturierte Kostenanalytik in einer intuitiv bedienbaren KMU-Lösung vereint. Vertragsmanager schließt diese Lücke.

Quellen: G2-Vergleich CLM-Software April 2026, Capterra-Marktübersicht 2025, Gartner Magic Quadrant CLM 2024

---

## 4. Zielgruppe

### 4.1 Primäre Zielgruppe (B2B KMU) und Marktvolumen

Die primäre Zielgruppe sind Entscheidungsträger und Verwalter in kleinen und mittleren Unternehmen, die laufende Abonnements, Verträge und Lizenzen verwalten müssen. Sie bilden den größeren Markt, haben hohen täglichen Handlungsbedarf und sind am wenigsten durch bestehende Anbieter bedient.

**Warum KMU priorisiert werden:** Sie sind die Mehrheit der 2,1 bis 2,6 Millionen Zielkunden im DACH-Raum. Entscheidungen werden schnell getroffen — oft durch eine Einzelperson. Ein Tool mit klar messbarem ROI (Kostenersparnis durch vermiedene Auto-Renewals) gewinnt diese Gruppe ohne komplexen Vertriebszyklus. Enterprise-Kunden haben längere Entscheidungszyklen, eigene IT-Abteilungen und dedizierte CLM-Beauftragungen.

**Vier Nutzerprofile:**

**Überlasteter Geschäftsführer:** Führt ein KMU mit 5 bis 30 Mitarbeitenden. Hat keine dedizierte Person für Vertragsmanagement. Zahlt seit Monaten für ungenutzte Abos, weil die Kündigung im Alltagsstress vergessen wurde. Braucht Überblick ohne Einarbeitungsaufwand.

**Office-Managerin / Assistenz der Geschäftsführung:** Verantwortlich für alle laufenden Verträge, Lizenzen und Rechnungen. Muss monatlich an den Geschäftsführer berichten, was das Unternehmen ausgibt. Braucht ein Tool, das automatisch Kostenreports generiert.

**IT-Verantwortlicher im Mittelstand:** Verwaltet Microsoft- und Adobe-Lizenzen für 50 bis 200 Mitarbeitende. Muss Lizenzzahlen aktuell halten, Über- und Unterlizenzen erkennen und Compliance nachweisen.

**Selbstständige und Freelancer:** Verwalten 5 bis 15 eigene Abonnements für Tools, Plattformen und Dienste. Keine Zeit für manuelle Pflege, aber direktes finanzielles Interesse an Kostenkontrolle.

### 4.2 Sekundäre Zielgruppe (Kanzleien, Steuerberater, Dienstleister)

Steuerberater, Anwaltskanzleien und Unternehmensberater, die mehrere Mandanten betreuen, sind eine attraktive, aber separate Zielgruppe. Sie brauchen Multi-Mandanten-Verwaltung, Rollen-Trennung zwischen Kanzlei und Mandant sowie automatische Berichte. Das ist ein Premium-Segment mit höherer Zahlungsbereitschaft.

Für Version 1 ist diese Zielgruppe nicht im Fokus. Die Infrastruktur (Organisations-Multi-Tenant-Architektur, Rollenkonzept, Audit-Log) wird aber so angelegt, dass eine Multi-Mandanten-Erweiterung in Version 2 ohne Architekturwechsel möglich ist.

### 4.3 Nicht Zielgruppe

Unternehmen ohne laufende digitale Abonnements oder ausschließlich mit Einmalkäufen (klassische Perpetual-Lizenzen) haben keinen unmittelbaren Nutzen aus Vertragsmanager. Das betrifft einen schrumpfenden Teil des Marktes, da die Softwareindustrie branchenweit auf Abonnementmodelle umgestellt hat. Diese Gruppe wird mit jeder weiteren SaaS-Adoption potenzieller Zielkunde.

---

## 5. Nutzen

### 5.1 Nutzen für Kunden

| Problem heute | Lösung durch Vertragsmanager | Konkreter Vorteil |
|---|---|---|
| Abonnements liegen in E-Mails, PDFs und Schreibtischschubladen | Foto oder Upload → automatische OCR-Extraktion → zentrale Übersicht | Alle Verträge erfasst in Minuten, nicht Stunden |
| Kündigungsfristen werden verpasst, Abos verlängern sich automatisch | Konfigurierbarer Erinnerungs-Workflow 90/60/30/14 Tage vor Frist | Kein ungewolltes Auto-Renewal mehr |
| Niemand weiß, was das Unternehmen monatlich für Software ausgibt | Echtzeit-Kostendashboard mit Monats-/Jahresauswertung und Kategorie-Breakdown | Fundierte Entscheidungsbasis für Budget-Gespräche |
| Kündigungsschreiben müssen jedes Mal manuell formuliert werden | Vorlagenbibliothek mit Auto-Befüllung, Download als PDF/DOCX | Kündigung in unter zwei Minuten, rechtskonform |
| Lizenzanzahlen stimmen nicht mit Mitarbeiterbestand überein | Lizenzfelder je Vertrag, Warnung bei Abweichung | Keine Über- oder Unterlizenzen |
| Datenschutzmängel bei US-Tools — Vertragsdaten in amerikanischen Clouds | EU-Only Hosting (Supabase EU Frankfurt, Vercel fra1), DSGVO-nativ | Datenschutz als echtes Kaufargument |
| Vertragsdokumentation für DSGVO-AVV-Nachweise fehlt | Alle Vertragspartner mit Kategorie und Dokumenten strukturiert gespeichert | Audit-Ready in Minuten |

Quellen: Forrester TEI CLM 2023, Gartner SAM-Studie 2024, C+R Research 2024

### 5.2 Nutzen für die WAMOCON GmbH

Vertragsmanager ist ein Produkt mit täglich wiederkehrender Nutzung. Jede Verwaltungshandlung — eine Fristprüfung, ein Kostenreport, eine Kündigung — ist ein Kontaktpunkt mit echtem Mehrwert. WAMOCON baut damit eine direkte, wiederkehrende Kundenbeziehung zu einer stark wachsenden Nutzergruppe auf.

**Eigenes Produkt mit Alleinstellungsmerkmal:** WAMOCON tritt als Softwareanbieter in einem strukturell wachsenden Markt auf. Das schafft Markenpräsenz unabhängig von Einzelprojekten.

**Mehrere Einnahmequellen:** Free- und bezahlte Tiers (Starter, Pro, Business), Jahresabonnements mit Rabatt und langfristig White-Label-Kooperationen mit Steuerberatern, Unternehmensberatern oder IHK-nahen Verbänden als Reseller-Kanal.

**Wachstumshebel:** Der SaaS-Markt verdoppelt bis verdreifacht sich bis 2030. Wer jetzt Nutzer gewinnt, profitiert von Switching-Costs und Nutzerloyalität — wer seine Verträge einmal strukturiert hat, wechselt das Tool nicht leichtfertig.

**Regulatorischer Moat:** DSGVO-native Infrastruktur ist für US-Wettbewerber strukturell schwer zu replizieren. Das schützt den Marktanteil langfristig.

---

## 6. Abhängigkeiten und Machbarkeit

Vertragsmanager hat drei externe Abhängigkeiten: einen OCR-Dienst für Dokumentenanalyse, einen transaktionalen E-Mail-Dienst für Erinnerungen und einen Zahlungsdienstleister für das Abonnementmodell. Alle drei sind ohne exklusive Partnerschaft lösbar. Wichtig: Alle können bei Bedarf ausgetauscht werden, da der OCR-Layer als abstrakte Schnittstelle implementiert wird.

### 6.1 Datenzugang und technische Services

| Service | Was er liefert | Für welche Funktion | Abhängigkeit | Kosten |
|---|---|---|---|---|
| **Azure Document Intelligence** | OCR-Extraktion aus PDFs, Fotos, strukturierten Dokumenten, 85–93 % Genauigkeit mit Review-Flow | Dokumentenerfassung, Schlüsselfeld-Extraktion | Kein Exklusivvertrag, nutzungsbasiert | Ca. 0,001–0,005 EUR/Seite |
| **Google Cloud Vision** (Fallback) | OCR-Extraktion, multilinguale Texterkennung | Fallback-OCR-Provider | Kein Exklusivvertrag, nutzungsbasiert | Ca. 0,0015 EUR/Anfrage |
| **Supabase (EU, Frankfurt)** | PostgreSQL-Datenbank, Auth, Row Level Security, Object Storage | Alle Daten, Authentifizierung, Dokumentenspeicher | DPA erforderlich, kein Exklusivvertrag | Ab 25 USD/Monat Pro-Plan |
| **Vercel (fra1 Frankfurt)** | Hosting, Deployment, Edge-Netzwerk | Frontend und API-Hosting | Kein Exklusivvertrag | Ab 20 USD/Monat Pro-Plan |
| **Resend oder Brevo (EU)** | Transaktionale E-Mails | Erinnerungen, Einladungen, Willkommens-E-Mails | Kein Exklusivvertrag | Ab 0 EUR (Free Tier ausreichend für MVP) |

### 6.2 Abrechnung und Zahlungsmodalitäten

| Option | Wie es funktioniert | Abhängigkeit | Empfehlung |
|---|---|---|---|
| **Stripe** | Branchenstandard für SaaS-Abonnements, unterstützt SEPA, Kreditkarte, automatische Verlängerungen | Stripe-Account, kein Exklusivvertrag, PCI-konform | Empfohlen ab Version 1 |
| **Paddle** | All-in-one Merchant of Record, übernimmt EU-MwSt | Kein eigenes MwSt-Setup nötig | Alternative für internationalen Rollout |
| **Manuell (Rechnungsstellung)** | Manuelle Abonnementverwaltung via Supabase-DB und SEPA-Überweisung | Kein Drittanbieter | Nicht empfohlen — zu aufwändig |

**Empfehlung:** Stripe ab Version 1 integrieren. Stripe ist PCI-DSS-konform, unterstützt SEPA-Lastschrift für DACH-Kunden und bietet den Billing-Portal-Baustein für Self-Service-Kundenverwaltung ohne eigene Implementierung.

### 6.3 Gesamtbewertung

Version 1 hat keine kritischen externen Abhängigkeiten, die einen Start blockieren könnten. Azure Document Intelligence und Supabase sind öffentlich verfügbar, erfordern keine Genehmigungen und können innerhalb weniger Stunden eingerichtet werden. Die OCR-Schicht wird provider-agnostisch als abstraktes Interface implementiert — ein Providerwechsel erfordert nur eine neue Implementierungsklasse, keine Datenbankmigrationen.

Der einzige risikobehaftete externe Faktor ist die OCR-Qualität bei unstrukturierten Handschriftenscans und schlecht digitalisierten PDFs. Diese wird durch den verpflichtenden Review-Flow nach jeder Extraktion mitigiert: Der Nutzer prüft und korrigiert die extrahierten Felder vor dem Speichern. Fehlertoleranz ist damit baulich in das Produkt integriert.

---

## 7. Anforderungen Version 1

Version 1 ist bewusst auf den Kern fokussiert: vollständige Vertragserfassung, proaktives Fristmanagement, Kostenüberblick und Kündigungsunterstützung. Keine KI-Empfehlungen, keine Bankkonto-Integration, keine nativen Mobile-Apps. Stattdessen: zuverlässige OCR-Erfassung, fehlertoleranter Review-Flow, konfigurierbare Erinnerungen und ein ehrlicher Kostenüberblick.

### 7.1 Hauptprozesse

#### 7.1.1 Dokumentenerfassung per OCR und manueller Eingabe

Datengrundlage: Azure Document Intelligence als primärer OCR-Provider, Google Cloud Vision als Fallback. Beide hinter einer abstrakten Service-Schnittstelle. Review-Flow nach jeder Extraktion verpflichtend — kein automatisches Speichern ohne Nutzerbestätigung.

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| DO-01 | Upload von PDF-, PNG-, JPEG- und HEIC-Dateien per Drag-Drop im Browser | Muss | Neu |
| DO-02 | Kamera-Upload auf Mobilgeräten (Mobile Browser, kein nativer App-Install) | Muss | Neu |
| DO-03 | OCR-Extraktion: Vertragspartner / Anbieter-Name | Muss | Neu |
| DO-04 | OCR-Extraktion: Vertragsbeginn und Vertragsende | Muss | Neu |
| DO-05 | OCR-Extraktion: Kündigungsfrist (z. B. „3 Monate zum Jahresende") | Muss | Neu |
| DO-06 | OCR-Extraktion: Zahlungsbetrag und Zahlungsintervall (monatlich / jährlich / quartalsweise) | Muss | Neu |
| DO-07 | OCR-Extraktion: Anzahl Lizenzen / Nutzeranzahl (sofern vorhanden) | Soll | Neu |
| DO-08 | OCR-Extraktion: Vertragskategorie als automatischer Vorschlag (manuell anpassbar) | Soll | Neu |
| DO-09 | Review-Flow nach jeder OCR-Extraktion: strukturiertes Formular zeigt extrahierte Felder zur Bestätigung oder Korrektur | Muss | Neu |
| DO-10 | Vollständig manueller Erfassungsweg ohne Dokument-Upload als gleichwertiger Onboarding-Pfad | Muss | Neu |
| DO-11 | Originaldokument optional verschlüsselt in Supabase Storage speichern (AES-256, EU-Region) | Soll | Neu |
| DO-12 | Nutzerkorrektur im Review-Flow wird im Audit-Log gespeichert (Vorher/Nachher-Diff) | Soll | Neu |

#### 7.1.2 Vertrags- und Aboübersicht

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| VE-01 | Dashboard in Karten- und Listen-Ansicht mit umschaltbarer Darstellung | Muss | Neu |
| VE-02 | Status-Badge je Vertrag: Aktiv / Kündigung fällig bald / Abgelaufen / Gekündigt | Muss | Neu |
| VE-03 | Freitext-Suche über alle Vertragsfelder (Anbieter, Name, Notizen) | Muss | Neu |
| VE-04 | Filter nach Kategorie, Zahlungsintervall, Anbieter, Status | Muss | Neu |
| VE-05 | Sortierung nach monatlichen Kosten, nächster Frist und Anbieter-Name | Muss | Neu |
| VE-06 | Detail-Ansicht je Vertrag mit vollständiger Bearbeitungsmöglichkeit aller Felder | Muss | Neu |
| VE-07 | Systemkategorien (Software & SaaS, Kommunikation, Versicherungen, Miete & Immobilien, Fahrzeuge & Leasing, Marketing & Werbung, Sonstiges) | Muss | Neu |
| VE-08 | Benutzerdefinierte Kategorien: Nutzer kann eigene Kategorien mit Name und Farbe anlegen | Soll | Neu |
| VE-09 | Lizenzfeld je Vertrag: Anzahl bezahlter vs. aktiv genutzter Lizenzen eintragbar | Soll | Neu |

#### 7.1.3 Frist- und Erinnerungsmanagement

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| FR-01 | Automatische Berechnung des Kündigungsdatums aus Vertragslaufzeit und Kündigungsfrist | Muss | Neu |
| FR-02 | Anzeige des berechneten Kündigungsdatums prominent in der Detail-Ansicht und auf der Karte | Muss | Neu |
| FR-03 | Konfigurierbare Erinnerungszeitpunkte pro Vertrag: 90 / 60 / 30 / 14 / 7 Tage vor Kündigungsfrist | Muss | Neu |
| FR-04 | Automatischer E-Mail-Versand zu den konfigurierten Zeitpunkten mit: Vertragsname, Anbieter, Fristdatum, direktem App-Link | Muss | Neu |
| FR-05 | In-App-Benachrichtigungs-Inbox mit ungelesenen-Badge in der Navigationsleiste | Muss | Neu |
| FR-06 | Fristenkalender-Ansicht: Monats- und Jahresübersicht aller bevorstehenden Fristen | Soll | Neu |
| FR-07 | .ics-Kalender-Export für alle Fristen (Outlook, Google Calendar, Apple Calendar kompatibel) | Soll | Neu |
| FR-08 | Erinnerungen können jederzeit deaktiviert, reaktiviert oder angepasst werden | Muss | Neu |

#### 7.1.4 Kostenübersicht und Analytik

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| KO-01 | Gesamtausgaben pro Monat: jährliche Abos werden auf monatliche Basis umgerechnet und addiert | Muss | Neu |
| KO-02 | Projektierte Jahreskosten auf Basis aller aktiven Verträge | Muss | Neu |
| KO-03 | Donut-Chart / Tortendiagramm der Ausgaben nach Kategorie | Muss | Neu |
| KO-04 | Liste der Top-10-Anbieter nach Ausgaben in aufsteigender Sortierung | Soll | Neu |
| KO-05 | Zahlungskalender: chronologische Ansicht der nächsten 12 Monatszahlungen (Cash-Flow-Sicht) | Soll | Neu |
| KO-06 | Monatsvergleich: aktuelle Monatskosten vs. Vormonat mit Delta-Anzeige | Soll | Neu |
| KO-07 | CSV-Export aller Vertragsdaten und Kosten als strukturierte Tabelle | Muss | Neu |
| KO-08 | PDF-Kostenbericht mit Gesamtübersicht, Kategorie-Breakdown und Liste aller Verträge | Soll | Neu |

#### 7.1.5 Kündigungsvorlagen

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| KV-01 | Vorlagenbibliothek mit professionellen Kündigungsschreiben in Deutsch (DE), Österreichisch-Deutsch (AT) und Englisch (EN) | Muss | Neu |
| KV-02 | Template-Typen: Ordentliche Kündigung zum Vertragsende / Kündigung unter Berufung auf Kündigungsfrist / Nichtverlängerungs-Bestätigung für Jahresabos | Muss | Neu |
| KV-03 | Außerordentliche Kündigung als separates Template mit markiertem Hinweis zur Rechtsprüfung | Soll | Neu |
| KV-04 | Auto-Befüllung der Vorlage mit Vertragsdaten: Anbieter-Name, Vertragsdatum, Kundennummer (wenn hinterlegt), Firmendaten des Nutzers | Muss | Neu |
| KV-05 | Download der ausgefüllten Vorlage als PDF und DOCX | Muss | Neu |
| KV-06 | Klar sichtbarer rechtlicher Disclaimer: „Diese Vorlage ist unverbindlich. Im Zweifelsfall konsultieren Sie einen Rechtsanwalt." | Muss | Neu |

---

### 7.2 Basisfunktionalitäten

#### 7.2.1 Rollen, Anmeldung und Registrierung

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| RB-01 | Drei Rollen: Admin (Vollzugriff inkl. Nutzerverwaltung), Editor (alle Funktionen außer Nutzerverwaltung), Viewer (nur lesen) | Muss | Neu |
| RB-02 | Registrierung per E-Mail mit Passwort und Double-Opt-In-Bestätigung via Supabase Auth | Muss | Neu |
| RB-03 | Anmeldung per E-Mail/Passwort sowie Social Login via Google und Microsoft | Soll | Neu |
| RB-04 | Passwort zurücksetzen per E-Mail-Link | Muss | Neu |
| RB-05 | Organisations-Account: ein gemeinsamer Account für eine GmbH / ein Unternehmen mit mehreren Nutzern | Muss | Neu |
| RB-06 | Row Level Security (RLS) in Supabase: Nutzer sehen ausschließlich die Daten ihrer eigenen Organisation | Muss | Neu |

#### 7.2.2 Organisationsverwaltung und Audit

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| OV-01 | Admin kann Nutzer per E-Mail-Einladung mit Rollenauswahl (Admin / Editor / Viewer) einladen | Muss | Neu |
| OV-02 | Eingeladener erhält E-Mail mit Aktivierungslink und wird nach Annahme der Organisation zugeordnet | Muss | Neu |
| OV-03 | Admin kann Rollen ändern und Nutzer jederzeit aus der Organisation entfernen | Muss | Neu |
| OV-04 | Audit-Log: Protokoll aller Änderungen mit Nutzer, Zeitstempel, Aktion und Vorher/Nachher-Diff | Soll | Neu |

#### 7.2.3 Navigation, Benachrichtigungen und Darstellung

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| NV-01 | Breadcrumb-Navigation auf allen Unterseiten | Muss | Neu |
| NV-02 | Dashboard als Startseite: Kostenübersicht, anstehende Fristen (nächste 30 Tage), zuletzt bearbeitete Verträge | Muss | Neu |
| NV-03 | Dunkel/Hell-Modus in den Einstellungen umschaltbar | Soll | Neu |
| NV-04 | Responsives Design: vollständig nutzbar auf Desktop, Tablet und Mobilbrowser | Muss | Neu |
| BN-01 | E-Mail-Benachrichtigung bei bevorstehenden Fristen gemäß konfigurierter Erinnerungsregel | Muss | Neu |
| BN-02 | In-App-Benachrichtigungs-Inbox mit ungelesenen-Badge in der Navigation | Muss | Neu |

#### 7.2.4 Spracheinstellungen und Profilseite

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| SP-01 | Sprachumschaltung Deutsch und Englisch in den Einstellungen ohne Seitenneuladung | Muss | Neu |
| SP-02 | Datum- und Währungsformat richten sich nach der gewählten Sprache (DE: dd.mm.yyyy / EN: mm/dd/yyyy) | Soll | Neu |
| PR-01 | Profilseite: Name, E-Mail-Adresse, Unternehmensname, Sprache, Passwort ändern | Muss | Neu |
| PR-02 | DSGVO-Rechte: Self-Service Konto- und Datenlöschung sowie vollständiger Datenexport (JSON/CSV) auf Anfrage (Art. 17 und 20 DSGVO) | Muss | Neu |

#### 7.2.5 Rechtliches und Geschäftsmodell

| ID | Anforderung | Priorität | Status |
|---|---|---|---|
| RE-01 | AGB, Impressum und Datenschutzerklärung als eigene, verlinkbare Seiten in der App | Muss | Neu |
| RE-02 | Cookie-Banner bei erstem Aufruf, DSGVO-konform; Empfehlung: Plausible Analytics (cookiefrei) statt Google Analytics | Muss | Neu |
| RE-03 | Vier-Tier-Preismodell: Free (5 Verträge, 1 Nutzer) / Starter (€19/Monat, 30 Verträge, 3 Nutzer) / Pro (€49/Monat, unbegrenzt, 10 Nutzer) / Business (€99/Monat, unbegrenzt, 25 Nutzer) | Muss | Neu |
| RE-04 | Upgrade von Free auf bezahlte Tiers direkt in der App via Stripe | Muss | Neu |
| RE-05 | Server ausschließlich in der EU: Supabase EU-Region (eu-central-1, Frankfurt), Vercel fra1 (Frankfurt) | Muss | Neu |
| RE-06 | Data Processing Agreement (DPA) mit allen Drittanbietern (Supabase, Vercel, Azure, E-Mail-Service) vor Launch abgeschlossen | Muss | Neu |

---

### 7.3 Scope: Was ist Version 1 und was nicht

| In Scope — Version 1 | Out of Scope — ab Version 2 und später |
|---|---|
| OCR-Upload (PDF, Foto) mit Review-Flow | E-Mail-Postfach-Scan (IMAP-Integration) |
| Manueller Erfassungsweg | KI-basierte Vertragskostenempfehlungen |
| Vertrags- und Aboübersicht (Karten- und Listenansicht) | Bankkonto-Integration (PSD2/Open Banking) |
| Proaktive Fristerinnerungen per E-Mail und In-App | Native iOS/Android-App |
| Kostenübersicht, Donut-Chart, Monatsvergleich | Automatisches Kündigen per API |
| CSV- und PDF-Export | Multi-Mandanten-Modul für Kanzleien |
| Kündigungsvorlagen DE/AT/EN (PDF + DOCX) | Buchhaltungs-Integration (DATEV, Lexoffice) |
| Multi-User: Admin / Editor / Viewer | Branchenvergleich (Benchmark-Daten) |
| Organisationseinladung per E-Mail | White-Label / Reseller-Programm |
| Stripe-Abonnementverwaltung | Mehrsprachige Vorlagen (FR, ES, IT) |
| DSGVO-Rechte: Datenlöschung und -export | KI-Chat-Interface über eigene Vertragssammlung |
| AGB, Datenschutzerklärung, Cookie-Banner | Vertragsverhandlungs-Assistent |
| Dunkel/Hell-Modus, Sprachumschaltung DE/EN | Semantische Suche (pgvector RAG) |

---

## 8. Chancen und Risiken

### 8.1 Chancen

| Chance | Begründung |
|---|---|
| Strukturell wachsende Zielgruppe | SaaS-Abos verdoppeln sich bis 2028 im KMU-Markt. Jedes neue Abo ist ein weiterer Nutzergrund. |
| DSGVO als dauerhafter Selektionsvorteil | US-Hosting ist für DACH-KMU mit sensiblen Vertragsdaten strukturell unattraktiv. Ein EU-native Anbieter gewinnt dieses Argument dauerhaft. |
| Regulatorik schafft Zwangsnachfrage | DSGVO, LkSG, CSRD und EU AI Act erzwingen strukturierte Vertragsdokumentation — ohne dass Vertragsmanager aktiv verkauft werden muss. |
| Kein neutraler Vollservice-Anbieter im DACH-KMU-Segment | Die Kombination aus OCR-Erfassung, proaktivem Fristmanagement und Kostenanalytik in einem DSGVO-nativen Produkt gibt es nicht. Die Lücke ist offen und zugänglich. |
| Messbar schneller ROI | Forrester (2023): Im ersten Monat nach Einführung entdecken Nutzer durchschnittlich 2,3 unbekannte oder ungenutzte Verträge. Eine Ersparnis von einem Jahresabo amortisiert das Jahresabonnement in der Regel vollständig. |
| Version 1 ohne kritische Abhängigkeiten | Kein Partnervertrag, keine Behördengenehmigung nötig. Start ist unmittelbar möglich. Kein Gatekeeper kann den Marktzugang blockieren. |

### 8.2 Risiken

| Risiko | Warum es eintreten kann | Gegenmaßnahme |
|---|---|---|
| OCR-Qualität bei unstrukturierten Dokumenten | Handschriften, schlecht gescannte PDFs, nicht-standardisierte Layouts können Extraktion auf 60–70 % Genauigkeit reduzieren | Review-Flow als Pflichtabschnitt nach jeder Extraktion — OCR ist Entwurf, nicht Endergebnis. Fehlertoleranz ist baulich integriert. |
| Cold-Start-Problem: Produkt hat erst nach 5+ Einträgen Wert | Leeres Dashboard liefert keinen unmittelbaren Nutzen. Früher Churn, wenn Onboarding scheitert | Guided Onboarding mit Fortschrittsanzeige, E-Mail-Sequenz in den ersten 14 Tagen, erster messbarer Mehrwert nach 3 erfassten Verträgen sichtbar |
| Zahlungsbereitschaft für „Vertragsmanagement" | KMU ordnen Vertragsmanagement als „nice to have" ein, nicht als Pflichtausgabe | Freemium-Einstieg mit 5 kostenlosen Verträgen senkt Hürde auf null. Conversion über messbaren Mehrwert (entdeckte Ersparnisse). |
| Wechsel zwischen OCR-Providern (Preiserhöhung, Dienstaustritt) | Abhängigkeit von einem einzigen Anbieter schafft Preisrisiko | Abstrakte OCR-Service-Schnittstelle von Tag 1 — Providerwechsel erfordert nur neue Klasse, keine Datenbankmigration |
| Etablierte Anbieter schließen die Lücke | DocuSign oder ein europäischer Wettbewerber baut OCR + Kündigungsvorlagen nach | DSGVO-Positionierung ist für US-Anbieter strukturell schwer replizierbar. First-Mover-Vorteil durch schnellen Launch. |
| Regulatorische Anforderungen beim Zahlungsmodell | Als Zahlungsabwickler greifen PSD2-Anforderungen | Stripe übernimmt gesamte PSD2-Compliance als zertifizierter Zahlungsdienstleister. Kein eigenes Lizenzerwerb nötig. |

---

## 9. Umsetzungsplan Version 1

### 9.1 Entwicklungsansatz

Die Entwicklung erfolgt mit GitHub Copilot als aktivem Implementierungswerkzeug. GitHub Copilot schreibt den Großteil des Codes, der Entwickler übernimmt Review, Architekturentscheidungen und Qualitätssicherung. Das ermöglicht die Umsetzung von Version 1 in 5 Werktagen.

**Technologiestack für Version 1:**

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, TypeScript, shadcn/ui Komponenten
- **Backend / Datenbank:** Supabase (PostgreSQL mit Row Level Security, Auth, Object Storage) — EU-Region Frankfurt
- **OCR-Engine:** Azure Document Intelligence (primär), Google Cloud Vision (Fallback), provider-agnostisch hinter eigenem Interface
- **E-Mail-Service:** Resend oder Brevo (EU-Anbieter, DSGVO-konform)
- **Payment:** Stripe (Abonnementverwaltung, SEPA, Kreditkarte)
- **Hosting und Deployment:** Vercel (fra1 Frankfurt, automatisches Deployment aus GitHub)
- **Analytics:** Plausible Analytics (EU-gehostet, cookiefrei, kein DSGVO-Banner nötig)

### 9.2 Umsetzungsplan 5 Werktage

| Tag | Fokus | Inhalt | Wer / womit |
|---|---|---|---|
| Tag 1 | Anforderungen erfassen | Anforderungsdokument finalisieren und mit Stakeholdern abstimmen, Datenbankschema vollständig entwerfen (Tabellen, RLS-Regeln, Indizes), Komponentenstruktur und Routing-Konzept (Next.js App Router) festlegen, OCR-Provider-Entscheidung treffen und API-Zugang beantragen, alle technischen Abhängigkeiten und deren Versionen fixieren | Entwickler und GitHub Copilot |
| Tag 2 | Rahmenbedingungen und erster Prototyp (OCR) | Vercel-Deployment-Pipeline aus GitHub einrichten (fra1 Frankfurt), Supabase-Projekt in EU-Region aufsetzen (Schema, RLS-Policies, Auth-Konfiguration), Strato-Domain konfigurieren und mit Vercel verknüpfen, Basis-UI-Framework aufsetzen (Next.js 15, Tailwind, shadcn/ui), Azure Document Intelligence hinter Abstract-Interface anbinden, Upload-Komponente (Drag-Drop + Kamera-Mobile), Review-Flow-UX (Feldbestätigung und -korrektur), optionale Dokumentenspeicherung Supabase Storage, manueller Erfassungsweg. Zwischenstand: lauffähiger OCR-Upload mit Review-Flow | Entwickler und GitHub Copilot |
| Tag 3 bis 4 | Alle Kernfunktionen | Dashboard (Karten- und Listenansicht), Status-Badge-Logik, Freitext-Suche, Filter und Sortierung, Detail-Ansicht mit Bearbeitungsmodus, Kategorieverwaltung (System + benutzerdefiniert). Fristberechnungslogik (Vertragslaufzeit + Kündigungsfrist → Kündigungsdatum), täglicher Cron-Job für Fristprüfung, E-Mail-Versand (Resend/Brevo), In-App-Benachrichtigungs-Inbox, Fristenkalender-Ansicht, .ics-Export. Monats-/Jahresauswertung (anteilige Umrechnung), Donut-Chart nach Kategorie, Top-Anbieter-Liste, Zahlungskalender, Monatsvergleich, CSV-Export, PDF-Kostenbericht. Template-Engine für DE/AT/EN-Vorlagen, Auto-Befüllung mit Vertragsdaten, PDF- und DOCX-Generierung, rechtlicher Disclaimer. Organisations-Einladungsflow, Rollen-Rechtemodell (Admin/Editor/Viewer), Audit-Log. GitHub Copilot schreibt den Code, Entwickler reviewt und korrigiert | Entwickler und GitHub Copilot |
| Tag 5 | QA und Launch | Manuelles Testen aller Kernfunktionen (OCR-Upload, Fristberechnung, E-Mail-Erinnerung, Kostenübersicht, Kündigungsvorlage, Rollen), Fehlerkorrektur und Edge-Cases, Plausible Analytics einbinden, direkter Service-Launch | Entwickler und GitHub Copilot |

**Hinweis:** Die 5-Tage-Umsetzung produziert einen lauffähigen Dienst mit allen Kernfunktionen. Das ist kein Endprodukt, aber eine nutzbare Version 1, die echter Nutzung standhalten kann. Payment-Integration und rechtliche Dokumente (AGB, Datenschutzerklärung) werden in einem separaten Folgeschritt nach dem Launch ergänzt. Qualitätssicherung und Stabilisierung laufen nach dem 5-Tage-Sprint weiter.

---

## Quellenverzeichnis

| Quelle | Inhalt |
|---|---|
| Bitkom Digitalatlas 2025 | KMU-SaaS-Adoptionsrate, 34 Abos/Unternehmen im Median, bitkom.org |
| Gartner Technology Insights for Software Asset Management, 2024 | Nur 47 % der bezahlten Softwarelizenzen werden genutzt, 25–30 % Kostenreduktion durch SAM, gartner.com |
| Gartner Forecast: Public Cloud Services, Worldwide, 2025 | SaaS-Markt 317 Mrd. USD (2024), 820 Mrd. USD bis 2030, gartner.com |
| Forrester Research — The Total Economic Impact of Contract Lifecycle Management Solutions, 2023 | ROI 337 % über 3 Jahre, durchschnittlich 2,3 unbekannte Verträge im ersten Monat entdeckt, forrester.com |
| C+R Research — Subscription Economy Consumer Survey, 2024 | 17–23 % der Abo-Ausgaben für ungenutzte Dienste, crresearch.com |
| Statistisches Bundesamt, Unternehmensregister, 2025 | 3,5 Millionen KMU in Deutschland, destatis.de |
| IFM Bonn — KMU-Definition und Marktdaten, 2024 | KMU beschäftigen 55 % der Arbeitnehmer, erzielen 35 % des Umsatzes, ifm-bonn.org |
| Vakul Agarwal et al. — Contract Analytics with Natural Language Processing, ACM Digital Library, 2022 | NLP-Vertragsextraktion erreicht 85–93 % Genauigkeit mit Human-in-the-Loop, ohne Review nur 68–75 %, dl.acm.org |
| McKinsey Global Survey — The State of AI in 2024 | 65 % der Unternehmen nutzen GenAI, Top-Anwendungsfall Dokumentenverarbeitung 43 %, mckinsey.com |
| European Commission — SME Performance Review: Digital Transformation, 2023 | 22 % der EU-KMU nutzen Cloud-CLM, 58 % noch mit Office-Dokumenten, ec.europa.eu |
| EU-DSGVO (VO 2016/679), insb. Art. 5, 6, 17, 20, 28, 30, 32, 33 | Rechtsgrundlagen, Betroffenenrechte, Auftragsverarbeitung, Datenpannenmeldung, eur-lex.europa.eu |
| EU AI Act (Verordnung 2024/1689) | Risikoklassifikation KI-Systeme, Transparenzpflichten, eur-lex.europa.eu |
| Lieferkettensorgfaltspflichtengesetz (LkSG), §3 ff., Deutschland 2023 | Sorgfaltspflichten und Dokumentationsanforderungen, gesetze-im-internet.de |
| CSRD-Richtlinie 2022/2464 | Nachhaltigkeitsberichterstattung ab 500 MA (2025) und 250 MA (2026), eur-lex.europa.eu |
| G2 — CLM Software Market Overview, April 2026 | Konkurrenzvergleich DocuSign CLM, Ironclad, PandaDoc, g2.com |
| Gartner Magic Quadrant for Contract Life Cycle Management, 2024 | Marktpositionierung Enterprise-Anbieter, KMU-Lücke dokumentiert, gartner.com |

---

*Dokument erstellt: 14. April 2026 | Version 1.0 | Status: Zur Freigabe eingereicht*
*Alle Marktdaten basieren auf zum Erstellungszeitpunkt öffentlich verfügbaren Quellen. Für bindende rechtliche Aussagen (insbesondere DSGVO-Konformität, Kündigungsvorlagen) ist juristischer Beistand erforderlich.*
