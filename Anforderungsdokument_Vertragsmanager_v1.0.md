# Anforderungsdokument Vertragsmanager
## Softwareprojekt Welle 6

---

| | |
|---|---|
| **Projekt** | Vertragsmanager |
| **Unternehmen** | WAMOCON GmbH |
| **App Version** | 1 |
| **Erstellt von** | Daniel Moretz |
| **Eingereicht an** | Waleri Moretz (GeschÃ¤ftsfÃ¼hrung) |
| **Datum** | 14. April 2026 |
| **Vertraulichkeit** | Intern vertraulich |
| **Status** | Zur Freigabe eingereicht |

---

## 1. Zusammenfassung

### 1.1 Die Idee

**Vertragsmanager** ist eine webbasierte SaaS-Plattform fÃ¼r kleine und mittlere Unternehmen im DACH-Raum. Sie lÃ¶st ein strukturelles und tÃ¤glich spÃ¼rbares Problem: Wer ein Unternehmen fÃ¼hrt oder verwaltet, hat Dutzende laufende Abonnements, VertrÃ¤ge und Lizenzen â€” verteilt auf E-Mail-PostfÃ¤cher, PDF-Ordner, Schubladenarchive und das GedÃ¤chtnis einzelner Mitarbeiter. KÃ¼ndigungsfristen werden verpasst, Abos laufen jahrelang ungenutzt weiter, und niemand hat einen vollstÃ¤ndigen Ãœberblick Ã¼ber die tatsÃ¤chlichen monatlichen Kosten.

Vertragsmanager lÃ¶st dieses Problem mit einem klaren Dreischritt: Ein Dokument fotografieren oder hochladen, automatisch die Kerndaten per OCR extrahieren lassen, und sofort in einer Ã¼bersichtlichen Zentrale verwalten â€” inklusive proaktiver Erinnerungen vor KÃ¼ndigungsfristen, konfigurierbarer Kosten-Dashboards und rechtskonformer KÃ¼ndigungsvorlagen fÃ¼r den DACH-Raum.

### 1.2 Warum jetzt?

Im Jahr 2025 nutzt ein durchschnittliches deutsches KMU mit 10 bis 250 Mitarbeitenden im Median **34 verschiedene SaaS-Abonnements** gleichzeitig â€” Tendenz stark steigend (Bitkom, 2025). Die Gesamtausgaben fÃ¼r Software-Abonnements im DACH-KMU-Segment werden fÃ¼r 2025 auf **18,7 Milliarden Euro** geschÃ¤tzt.

Das Kernproblem ist gut dokumentiert: Branchenstudien zeigen, dass Unternehmen im Schnitt 17 bis 23 Prozent ihrer Abo-Ausgaben fÃ¼r ungenutzte oder redundante Dienste aufwenden (C+R Research, 2024). Bei einem typischen KMU mit 50.000 Euro Jahresausgaben fÃ¼r Software sind das bis zu 11.500 Euro verbranntes Budget â€” ohne jedes strategische Bewusstsein.

Gleichzeitig haben GroÃŸanbieter wie Adobe, Microsoft und Salesforce ihre Lizenzpreise 2024/25 um 10 bis 25 Prozent erhÃ¶ht. Konjunktureller Druck und explodierende Softwarekosten zwingen KMU dazu, Ausgaben aktiv zu steuern. Ein DSGVO-natives, DACH-fokussiertes Tool, das dieses Problem elegant und ohne Einarbeitungsaufwand lÃ¶st, findet heute einen reifen, zahlungsbereiten Markt.

Parallel dazu treiben regulatorische Rahmen wie die CSRD und das Lieferkettensorgfaltspflichtengesetz (LkSG) den Bedarf nach strukturierter Vertragsdokumentation in die HÃ¶he. Unternehmen mÃ¼ssen nachweisen kÃ¶nnen, welche Dienstleister sie nutzen, unter welchen Bedingungen und seit wann. Vertragsmanager liefert diese Basis.

---

## 2. Marktanalyse: Fokus DACH

### 2.1 KMU-Softwarelandschaft und Zielgruppe

Deutschland hat rund **3,5 Millionen KMU** â€” definiert als Unternehmen mit weniger als 250 Mitarbeitenden. Sie beschÃ¤ftigen 55 Prozent aller sozialversicherungspflichtig BeschÃ¤ftigten und erzielen 35 Prozent des gesamten Umsatzes in Deutschland. Ã–sterreich und die Schweiz ergÃ¤nzen den DACH-Raum mit weiteren 600.000 KMU.

Nicht alle 3,5 Millionen KMU sind sofortige Zielkunden. Wer kein einziges SaaS-Abo hat, braucht Vertragsmanager nicht. Wer ausschlieÃŸlich einmalige Softwarelizenzen nutzt und keine laufenden VertrÃ¤ge verwaltet, hat keinen unmittelbaren Leidensdruck. Die realistische Kernzielgruppe sind KMU, die **mindestens fÃ¼nf laufende digitale Abonnements oder VertrÃ¤ge** gleichzeitig verwalten â€” das betrifft heute schÃ¤tzungsweise **2,1 bis 2,6 Millionen Unternehmen** im DACH-Raum, wachsend auf 3 bis 4 Millionen bis 2028.

Quellen: Bitkom Digitalatlas 2025, Statistisches Bundesamt 2025, IFM Bonn 2024

### 2.2 Wachstum des SaaS-Marktes und was das bedeutet

Der globale SaaS-Markt wuchs 2024 auf 317 Milliarden US-Dollar und wird bis 2030 auf Ã¼ber 820 Milliarden US-Dollar prognostiziert (Gartner, 2025). Im DACH-Raum steigt die SaaS-Adoptionsrate jÃ¤hrlich um 18 bis 22 Prozent.

Was das fÃ¼r Vertragsmanager bedeutet: Jedes neue SaaS-Abo ist ein weiterer Eintrag, der in eine Vertragsliste gehÃ¶rt. Je mehr Abonnements ein KMU abschlieÃŸt, desto dringlicher wird die Verwaltungsfrage. Vertragsmanager wird mit jeder neuen SoftwareneueinfÃ¼hrung im Markt wertvoller â€” nicht weniger. Das ist eine strukturelle Wachstumsdynamik, die unabhÃ¤ngig von einzelnen Projekten wirkt.

Gleichzeitig steigen die Stornierungskosten: Adobe, Microsoft und Salesforce haben Jahresabos mit automatischer VerlÃ¤ngerung und KÃ¼ndigungsfristen von 30 bis 90 Tagen als Standard etabliert. Ein verpasstes KÃ¼ndigungsdatum bedeutet unmittelbar einen weiteren Jahresbeitrag â€” oft zwischen 500 und 5.000 Euro je Abo.

Quellen: Gartner Forecast 2025, Bitkom SaaS-Studie DACH 2024, Statista Cloud-Software-Markt 2025

### 2.3 Das Kernproblem: Fragmentiertes Vertragsmanagement

Fragmentierung bezeichnet den Zustand, in dem zusammengehÃ¶rige Information auf viele unverbundene Orte verteilt ist. Im KMU-Vertragsmanagement bedeutet das: Jeder Vertrag kommt von einem anderen Anbieter, landet in einem anderen E-Mail-Postfach und wird in einer anderen Schublade oder auf einem anderen Laufwerk abgelegt. Es gibt keine Zentrale.

Das erzeugt sechs konkrete Probleme fÃ¼r jede UnternehmensfÃ¼hrung:

**Intransparente Gesamtkosten:** Die meisten KMU-Inhaber kÃ¶nnen nicht aus dem Stegreif sagen, was sie monatlich fÃ¼r Software ausgeben. Addiert man alle Einzel-Abos, ist das Ergebnis regelmÃ¤ÃŸig Ã¼berraschend â€” im negativen Sinne.

**Verpasste KÃ¼ndigungsfristen:** Abonnements mit automatischer VerlÃ¤ngerung und 30- bis 90-tÃ¤gigen Fristen verlÃ¤ngern sich still, wenn niemand aktiv widerruft. Forrester (2023) dokumentiert, dass Unternehmen im ersten Monat nach EinfÃ¼hrung eines CLM-Tools durchschnittlich 2,3 bis dahin unbekannte oder ungenutzte VertrÃ¤ge entdecken.

**Veraltete Lizenzzahlen:** Mitarbeiterbewegungen fÃ¼hren dazu, dass fÃ¼r ausgeschiedene oder nie aktive Mitarbeitende weiterhin Lizenzen bezahlt werden. Gartner (2024) schÃ¤tzt, dass Unternehmen durchschnittlich nur 47 Prozent der Softwarelizenzen nutzen, fÃ¼r die sie zahlen.

**Fehlende Dokumentation:** Regulatorische Anforderungen (DSGVO, LkSG, CSRD) verlangen, dass Unternehmen nachweisen kÃ¶nnen, welche Dienstleister sie beauftragen und unter welchen Datenschutzbedingungen. Diese Nachweise liegen selten strukturiert vor.

**PersonenabhÃ¤ngiges Wissen:** Wer ist fÃ¼r welchen Vertrag zustÃ¤ndig? Wenn die Office-Managerin das Unternehmen verlÃ¤sst, geht das institutionelle Vertragswissen mit ihr. Ein Tool schafft Institutionalisierung.

**Mangelnde Verhandlungsbasis:** Wer nicht weiÃŸ, seit wann er wie viel zahlt, kann nicht kompetent nachverhandeln. Vertragsmanager liefert die Datenbasis fÃ¼r jedes PreisgesprÃ¤ch.

Zum Vergleich: Die kaufmÃ¤nnische Buchhaltung war vor 30 Jahren genauso fragmentiert. Erst ERP-Systeme und dann cloudbasierte Buchhaltungstools lÃ¶sten das. Im Vertragsmanagement stehen KMU heute genau an diesem Wendepunkt.

Quellen: Gartner CLM-Studie 2024, Forrester TEI-Studie 2023, C+R Research Consumer Subscription Survey 2024

### 2.4 Regulatorischer RÃ¼ckenwind

Mehrere regulatorische Entwicklungen treiben den Bedarf nach strukturiertem Vertragsmanagement direkt:

**DSGVO (seit 2018, BuÃŸgelddurchsetzung ab 2020):** Jedes Unternehmen muss nachweisen kÃ¶nnen, welche Drittanbieter personenbezogene Daten verarbeiten. AuftragsverarbeitungsvertrÃ¤ge (AVV) mÃ¼ssen gefÃ¼hrt und aktuell gehalten werden. Ohne Vertragszentrale ist dieser Nachweis kaum erbringbar.

**LkSG (in Kraft seit Januar 2023):** Unternehmen ab 1.000 Mitarbeitenden mÃ¼ssen Sorgfaltspflichten in der Lieferkette nachweisen, was den Druck auf Lieferanten aller GrÃ¶ÃŸen erhÃ¶ht, Vertragsbeziehungen strukturiert zu dokumentieren.

**CSRD (Corporate Sustainability Reporting Directive, ab 2025 fÃ¼r groÃŸe, ab 2026 fÃ¼r mittlere Unternehmen):** Nachhaltigkeitsberichterstattung erfordert eine vollstÃ¤ndige Ãœbersicht Ã¼ber Dienstleister und deren Konditionen â€” das setzt strukturiertes Vertragsmanagement voraus.

**EU AI Act (vollstÃ¤ndig anwendbar ab August 2026):** Wer KI-basierte Dienstleistungen einkauft oder einsetzt, muss deren vertragliche Grundlage und Risikoklassifikation dokumentieren kÃ¶nnen.

Keiner dieser regulatorischen Treiber erfordert das Kauf eines CLM-Tools. Aber jeder einzelne setzt voraus, was ein fehlendes Tool systematisch verhindert: einen vollstÃ¤ndigen, zuverlÃ¤ssigen Ãœberblick Ã¼ber alle Vertragsbeziehungen.

Quellen: EU-DSGVO Art. 30, LkSG Â§3, CSRD-Richtlinie 2022/2464, EU AI Act 2024

---

## 3. Wettbewerb

### 3.1 Spezialisierte CLM-Anbieter: StÃ¤rken und strukturelle SchwÃ¤chen

Spezialisierte Anbieter fÃ¼r Contract Lifecycle Management existieren, sind aber entweder auf Enterprise-Kundschaft ausgerichtet oder decken zentrale Funktionen wie OCR oder proaktive Fristerinnerungen nicht ab. Das schafft einen strukturellen Interessenkonflikt: Ihre KomplexitÃ¤t und ihr Preismodell passen nicht zu KMU.

| Anbieter | Reichweite | StÃ¤rke des Anbieters | SchwÃ¤che und Chance fÃ¼r Vertragsmanager |
|---|---|---|---|
| **DocuSign CLM** | Global, Enterprise | MarktfÃ¼hrer E-Signatur, starke Vertragsworkflows, Salesforce-Integration | Ab 25 USD pro Nutzer/Monat, komplexe Einrichtung, kein OCR-Upload, keine KMU-Positionierung, US-Hosting |
| **Ironclad** | US-fokussiert | Starke KI-Klauselanalyse, modernes UX | Enterprise-only (ab 2.000 USD/Monat), kein DACH-Fokus, kein DSGVO-natives Hosting, keine KÃ¼ndigunsvorlagen DE/AT |
| **Vertragsheld (DE)** | DACH | Deutschsprachig, Vertragsvorlagen, bekannt bei Kanzleien | Kein proaktives Fristmanagement, keine Kostenanalytik, kein OCR-Upload, veraltet in UX und Funktionsumfang |
| **PandaDoc** | Global | Einfache Nutzung, E-Signatur, Templates | US-Hosting (DSGVO-Grauzone), kein DACH-spezifisches Rechtsformat, kein Fristmanagement, kein KostenÃ¼berblick |

Das gemeinsame Muster: Kein einziger Anbieter kombiniert OCR-basierten Schnellerfassung, proaktives KÃ¼ndigungsfrist-Management und Kostenanalytik in einem DSGVO-nativ betriebenen, auf DACH-KMU zugeschnittenen Produkt. Das ist die MarktÃ¶ffnung fÃ¼r Vertragsmanager.

### 3.2 Indirekte Anbieter: Warum sie die LÃ¼cke nicht schlieÃŸen

Indirekte Anbieter decken Teilprobleme ab, aber keiner schlieÃŸt die LÃ¼cke vollstÃ¤ndig:

| Anbieter | Was er bietet | Was fehlt und warum das eine Chance ist |
|---|---|---|
| **Spendflo / Tronity** | SaaS-Spend Management, KostenÃ¼bersicht | Enterprise-Preis (ab 500 EUR/Monat), kein OCR, kein proaktives Fristmanagement, US-Hosting |
| **Genuity** | IT-Spend-Ãœbersicht fÃ¼r KMU (US) | Nur auf US-Markt, keine DSGVO-KonformitÃ¤t, keine KÃ¼ndigungsvorlagen, keine DACH-Lokalisierung |
| **Lexoffice / sevDesk** | Buchhaltung mit rudimentÃ¤ren Vertragsfeldern | Kein dediziertes Vertragsmanagement, kein OCR-Upload, kein Fristmanagement, kein Kostendashboard |
| **Microsoft SharePoint** | Dokumentenverwaltung | Keine intelligente Extraktion, keine Erinnerungen, kein Kostentracking â€” erfordert manuelle Pflege |
| **Excel / Google Sheets** | Flexibel, bekannt | FehleranfÃ¤llig, kein OCR, keine Automatisierung, keine Mandantentrennung, kein Rollenkonzept |

Die MarktlÃ¼cke: Es gibt heute kein DSGVO-natives, DACH-fokussiertes Produkt, das OCR-basierte Dokumentenerfassung, proaktives Fristmanagement mit KÃ¼ndigungsvorlagen und strukturierte Kostenanalytik in einer intuitiv bedienbaren KMU-LÃ¶sung vereint. Vertragsmanager schlieÃŸt diese LÃ¼cke.

Quellen: G2-Vergleich CLM-Software April 2026, Capterra-MarktÃ¼bersicht 2025, Gartner Magic Quadrant CLM 2024

---

## 4. Zielgruppe

### 4.1 PrimÃ¤re Zielgruppe (B2B KMU) und Marktvolumen

Die primÃ¤re Zielgruppe sind EntscheidungstrÃ¤ger und Verwalter in kleinen und mittleren Unternehmen, die laufende Abonnements, VertrÃ¤ge und Lizenzen verwalten mÃ¼ssen. Sie bilden den grÃ¶ÃŸeren Markt, haben hohen tÃ¤glichen Handlungsbedarf und sind am wenigsten durch bestehende Anbieter bedient.

**Warum KMU priorisiert werden:** Sie sind die Mehrheit der 2,1 bis 2,6 Millionen Zielkunden im DACH-Raum. Entscheidungen werden schnell getroffen â€” oft durch eine Einzelperson. Ein Tool mit klar messbarem ROI (Kostenersparnis durch vermiedene Auto-Renewals) gewinnt diese Gruppe ohne komplexen Vertriebszyklus. Enterprise-Kunden haben lÃ¤ngere Entscheidungszyklen, eigene IT-Abteilungen und dedizierte CLM-Beauftragungen.

**Vier Nutzerprofile:**

**Ãœberlasteter GeschÃ¤ftsfÃ¼hrer:** FÃ¼hrt ein KMU mit 5 bis 30 Mitarbeitenden. Hat keine dedizierte Person fÃ¼r Vertragsmanagement. Zahlt seit Monaten fÃ¼r ungenutzte Abos, weil die KÃ¼ndigung im Alltagsstress vergessen wurde. Braucht Ãœberblick ohne Einarbeitungsaufwand.

**Office-Managerin / Assistenz der GeschÃ¤ftsfÃ¼hrung:** Verantwortlich fÃ¼r alle laufenden VertrÃ¤ge, Lizenzen und Rechnungen. Muss monatlich an den GeschÃ¤ftsfÃ¼hrer berichten, was das Unternehmen ausgibt. Braucht ein Tool, das automatisch Kostenreports generiert.

**IT-Verantwortlicher im Mittelstand:** Verwaltet Microsoft- und Adobe-Lizenzen fÃ¼r 50 bis 200 Mitarbeitende. Muss Lizenzzahlen aktuell halten, Ãœber- und Unterlizenzen erkennen und Compliance nachweisen.

**SelbststÃ¤ndige und Freelancer:** Verwalten 5 bis 15 eigene Abonnements fÃ¼r Tools, Plattformen und Dienste. Keine Zeit fÃ¼r manuelle Pflege, aber direktes finanzielles Interesse an Kostenkontrolle.

### 4.2 SekundÃ¤re Zielgruppe (Kanzleien, Steuerberater, Dienstleister)

Steuerberater, Anwaltskanzleien und Unternehmensberater, die mehrere Mandanten betreuen, sind eine attraktive, aber separate Zielgruppe. Sie brauchen Multi-Mandanten-Verwaltung, Rollen-Trennung zwischen Kanzlei und Mandant sowie automatische Berichte. Das ist ein Premium-Segment mit hÃ¶herer Zahlungsbereitschaft.

FÃ¼r Version 1 ist diese Zielgruppe nicht im Fokus. Die Infrastruktur (Organisations-Multi-Tenant-Architektur, Rollenkonzept, Audit-Log) wird aber so angelegt, dass eine Multi-Mandanten-Erweiterung in Version 2 ohne Architekturwechsel mÃ¶glich ist.

### 4.3 Nicht Zielgruppe

Unternehmen ohne laufende digitale Abonnements oder ausschlieÃŸlich mit EinmalkÃ¤ufen (klassische Perpetual-Lizenzen) haben keinen unmittelbaren Nutzen aus Vertragsmanager. Das betrifft einen schrumpfenden Teil des Marktes, da die Softwareindustrie branchenweit auf Abonnementmodelle umgestellt hat. Diese Gruppe wird mit jeder weiteren SaaS-Adoption potenzieller Zielkunde.

---

## 5. Nutzen

### 5.1 Nutzen fÃ¼r Kunden

| Problem heute | LÃ¶sung durch Vertragsmanager | Konkreter Vorteil |
|---|---|---|
| Abonnements liegen in E-Mails, PDFs und Schreibtischschubladen | Foto oder Upload â†’ automatische OCR-Extraktion â†’ zentrale Ãœbersicht | Alle VertrÃ¤ge erfasst in Minuten, nicht Stunden |
| KÃ¼ndigungsfristen werden verpasst, Abos verlÃ¤ngern sich automatisch | Konfigurierbarer Erinnerungs-Workflow 90/60/30/14 Tage vor Frist | Kein ungewolltes Auto-Renewal mehr |
| Niemand weiÃŸ, was das Unternehmen monatlich fÃ¼r Software ausgibt | Echtzeit-Kostendashboard mit Monats-/Jahresauswertung und Kategorie-Breakdown | Fundierte Entscheidungsbasis fÃ¼r Budget-GesprÃ¤che |
| KÃ¼ndigungsschreiben mÃ¼ssen jedes Mal manuell formuliert werden | Vorlagenbibliothek mit Auto-BefÃ¼llung, Download als PDF/DOCX | KÃ¼ndigung in unter zwei Minuten, rechtskonform |
| Lizenzanzahlen stimmen nicht mit Mitarbeiterbestand Ã¼berein | Lizenzfelder je Vertrag, Warnung bei Abweichung | Keine Ãœber- oder Unterlizenzen |
| DatenschutzmÃ¤ngel bei US-Tools â€” Vertragsdaten in amerikanischen Clouds | EU-Only Hosting (Supabase EU Frankfurt, Vercel fra1), DSGVO-nativ | Datenschutz als echtes Kaufargument |
| Vertragsdokumentation fÃ¼r DSGVO-AVV-Nachweise fehlt | Alle Vertragspartner mit Kategorie und Dokumenten strukturiert gespeichert | Audit-Ready in Minuten |

Quellen: Forrester TEI CLM 2023, Gartner SAM-Studie 2024, C+R Research 2024

### 5.2 Nutzen fÃ¼r die WAMOCON GmbH

Vertragsmanager ist ein Produkt mit tÃ¤glich wiederkehrender Nutzung. Jede Verwaltungshandlung â€” eine FristprÃ¼fung, ein Kostenreport, eine KÃ¼ndigung â€” ist ein Kontaktpunkt mit echtem Mehrwert. WAMOCON baut damit eine direkte, wiederkehrende Kundenbeziehung zu einer stark wachsenden Nutzergruppe auf.

**Eigenes Produkt mit Alleinstellungsmerkmal:** WAMOCON tritt als Softwareanbieter in einem strukturell wachsenden Markt auf. Das schafft MarkenprÃ¤senz unabhÃ¤ngig von Einzelprojekten.

**Mehrere Einnahmequellen:** Free- und bezahlte Tiers (Starter, Pro, Business), Jahresabonnements mit Rabatt und langfristig White-Label-Kooperationen mit Steuerberatern, Unternehmensberatern oder IHK-nahen VerbÃ¤nden als Reseller-Kanal.

**Wachstumshebel:** Der SaaS-Markt verdoppelt bis verdreifacht sich bis 2030. Wer jetzt Nutzer gewinnt, profitiert von Switching-Costs und NutzerloyalitÃ¤t â€” wer seine VertrÃ¤ge einmal strukturiert hat, wechselt das Tool nicht leichtfertig.

**Regulatorischer Moat:** DSGVO-native Infrastruktur ist fÃ¼r US-Wettbewerber strukturell schwer zu replizieren. Das schÃ¼tzt den Marktanteil langfristig.

---

## 6. AbhÃ¤ngigkeiten und Machbarkeit

Vertragsmanager hat drei externe AbhÃ¤ngigkeiten: einen OCR-Dienst fÃ¼r Dokumentenanalyse, einen transaktionalen E-Mail-Dienst fÃ¼r Erinnerungen und einen Zahlungsdienstleister fÃ¼r das Abonnementmodell. Alle drei sind ohne exklusive Partnerschaft lÃ¶sbar. Wichtig: Alle kÃ¶nnen bei Bedarf ausgetauscht werden, da der OCR-Layer als abstrakte Schnittstelle implementiert wird.

### 6.1 Datenzugang und technische Services

| Service | Was er liefert | FÃ¼r welche Funktion | AbhÃ¤ngigkeit | Kosten |
|---|---|---|---|---|
| **Azure Document Intelligence** | OCR-Extraktion aus PDFs, Fotos, strukturierten Dokumenten, 85â€“93 % Genauigkeit mit Review-Flow | Dokumentenerfassung, SchlÃ¼sselfeld-Extraktion | Kein Exklusivvertrag, nutzungsbasiert | Ca. 0,001â€“0,005 EUR/Seite |
| **Google Cloud Vision** (Fallback) | OCR-Extraktion, multilinguale Texterkennung | Fallback-OCR-Provider | Kein Exklusivvertrag, nutzungsbasiert | Ca. 0,0015 EUR/Anfrage |
| **Supabase (EU, Frankfurt)** | PostgreSQL-Datenbank, Auth, Row Level Security, Object Storage | Alle Daten, Authentifizierung, Dokumentenspeicher | DPA erforderlich, kein Exklusivvertrag | Ab 25 USD/Monat Pro-Plan |
| **Vercel (fra1 Frankfurt)** | Hosting, Deployment, Edge-Netzwerk | Frontend und API-Hosting | Kein Exklusivvertrag | Ab 20 USD/Monat Pro-Plan |
| **Resend oder Brevo (EU)** | Transaktionale E-Mails | Erinnerungen, Einladungen, Willkommens-E-Mails | Kein Exklusivvertrag | Ab 0 EUR (Free Tier ausreichend fÃ¼r MVP) |

### 6.2 Abrechnung und ZahlungsmodalitÃ¤ten

| Option | Wie es funktioniert | AbhÃ¤ngigkeit | Empfehlung |
|---|---|---|---|
| **Stripe** | Branchenstandard fÃ¼r SaaS-Abonnements, unterstÃ¼tzt SEPA, Kreditkarte, automatische VerlÃ¤ngerungen | Stripe-Account, kein Exklusivvertrag, PCI-konform | Empfohlen ab Version 1 |
| **Paddle** | All-in-one Merchant of Record, Ã¼bernimmt EU-MwSt | Kein eigenes MwSt-Setup nÃ¶tig | Alternative fÃ¼r internationalen Rollout |
| **Manuell (Rechnungsstellung)** | Manuelle Abonnementverwaltung via Supabase-DB und SEPA-Ãœberweisung | Kein Drittanbieter | Nicht empfohlen â€” zu aufwÃ¤ndig |

**Empfehlung:** Stripe ab Version 1 integrieren. Stripe ist PCI-DSS-konform, unterstÃ¼tzt SEPA-Lastschrift fÃ¼r DACH-Kunden und bietet den Billing-Portal-Baustein fÃ¼r Self-Service-Kundenverwaltung ohne eigene Implementierung.

### 6.3 Gesamtbewertung

Version 1 hat keine kritischen externen AbhÃ¤ngigkeiten, die einen Start blockieren kÃ¶nnten. Azure Document Intelligence und Supabase sind Ã¶ffentlich verfÃ¼gbar, erfordern keine Genehmigungen und kÃ¶nnen innerhalb weniger Stunden eingerichtet werden. Die OCR-Schicht wird provider-agnostisch als abstraktes Interface implementiert â€” ein Providerwechsel erfordert nur eine neue Implementierungsklasse, keine Datenbankmigrationen.

Der einzige risikobehaftete externe Faktor ist die OCR-QualitÃ¤t bei unstrukturierten Handschriftenscans und schlecht digitalisierten PDFs. Diese wird durch den verpflichtenden Review-Flow nach jeder Extraktion mitigiert: Der Nutzer prÃ¼ft und korrigiert die extrahierten Felder vor dem Speichern. Fehlertoleranz ist damit baulich in das Produkt integriert.

---

## 7. Anforderungen Version 1

Version 1 ist bewusst auf den Kern fokussiert: vollstÃ¤ndige Vertragserfassung, proaktives Fristmanagement, KostenÃ¼berblick und KÃ¼ndigungsunterstÃ¼tzung. Keine KI-Empfehlungen, keine Bankkonto-Integration, keine nativen Mobile-Apps. Stattdessen: zuverlÃ¤ssige OCR-Erfassung, fehlertoleranter Review-Flow, konfigurierbare Erinnerungen und ein ehrlicher KostenÃ¼berblick.

### 7.1 Hauptprozesse

#### 7.1.1 Dokumentenerfassung per OCR und manueller Eingabe

Datengrundlage: Azure Document Intelligence als primÃ¤rer OCR-Provider, Google Cloud Vision als Fallback. Beide hinter einer abstrakten Service-Schnittstelle. Review-Flow nach jeder Extraktion verpflichtend â€” kein automatisches Speichern ohne NutzerbestÃ¤tigung.

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| DO-01 | Upload von PDF-, PNG-, JPEG- und HEIC-Dateien per Drag-Drop im Browser | Muss | Neu |
| DO-02 | Kamera-Upload auf MobilgerÃ¤ten (Mobile Browser, kein nativer App-Install) | Muss | Neu |
| DO-03 | OCR-Extraktion: Vertragspartner / Anbieter-Name | Muss | Neu |
| DO-04 | OCR-Extraktion: Vertragsbeginn und Vertragsende | Muss | Neu |
| DO-05 | OCR-Extraktion: KÃ¼ndigungsfrist (z. B. â€ž3 Monate zum Jahresende") | Muss | Neu |
| DO-06 | OCR-Extraktion: Zahlungsbetrag und Zahlungsintervall (monatlich / jÃ¤hrlich / quartalsweise) | Muss | Neu |
| DO-07 | OCR-Extraktion: Anzahl Lizenzen / Nutzeranzahl (sofern vorhanden) | Soll | Neu |
| DO-08 | OCR-Extraktion: Vertragskategorie als automatischer Vorschlag (manuell anpassbar) | Soll | Neu |
| DO-09 | Review-Flow nach jeder OCR-Extraktion: strukturiertes Formular zeigt extrahierte Felder zur BestÃ¤tigung oder Korrektur | Muss | Neu |
| DO-10 | VollstÃ¤ndig manueller Erfassungsweg ohne Dokument-Upload als gleichwertiger Onboarding-Pfad | Muss | Neu |
| DO-11 | Originaldokument optional verschlÃ¼sselt in Supabase Storage speichern (AES-256, EU-Region) | Soll | Neu |
| DO-12 | Nutzerkorrektur im Review-Flow wird im Audit-Log gespeichert (Vorher/Nachher-Diff) | Soll | Neu |

#### 7.1.2 Vertrags- und AboÃ¼bersicht

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| VE-01 | Dashboard in Karten- und Listen-Ansicht mit umschaltbarer Darstellung | Muss | Neu |
| VE-02 | Status-Badge je Vertrag: Aktiv / KÃ¼ndigung fÃ¤llig bald / Abgelaufen / GekÃ¼ndigt | Muss | Neu |
| VE-03 | Freitext-Suche Ã¼ber alle Vertragsfelder (Anbieter, Name, Notizen) | Muss | Neu |
| VE-04 | Filter nach Kategorie, Zahlungsintervall, Anbieter, Status | Muss | Neu |
| VE-05 | Sortierung nach monatlichen Kosten, nÃ¤chster Frist und Anbieter-Name | Muss | Neu |
| VE-06 | Detail-Ansicht je Vertrag mit vollstÃ¤ndiger BearbeitungsmÃ¶glichkeit aller Felder | Muss | Neu |
| VE-07 | Systemkategorien (Software & SaaS, Kommunikation, Versicherungen, Miete & Immobilien, Fahrzeuge & Leasing, Marketing & Werbung, Sonstiges) | Muss | Neu |
| VE-08 | Benutzerdefinierte Kategorien: Nutzer kann eigene Kategorien mit Name und Farbe anlegen | Soll | Neu |
| VE-09 | Lizenzfeld je Vertrag: Anzahl bezahlter vs. aktiv genutzter Lizenzen eintragbar | Soll | Neu |

#### 7.1.3 Frist- und Erinnerungsmanagement

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| FR-01 | Automatische Berechnung des KÃ¼ndigungsdatums aus Vertragslaufzeit und KÃ¼ndigungsfrist | Muss | Neu |
| FR-02 | Anzeige des berechneten KÃ¼ndigungsdatums prominent in der Detail-Ansicht und auf der Karte | Muss | Neu |
| FR-03 | Konfigurierbare Erinnerungszeitpunkte pro Vertrag: 90 / 60 / 30 / 14 / 7 Tage vor KÃ¼ndigungsfrist | Muss | Neu |
| FR-04 | Automatischer E-Mail-Versand zu den konfigurierten Zeitpunkten mit: Vertragsname, Anbieter, Fristdatum, direktem App-Link | Muss | Neu |
| FR-05 | In-App-Benachrichtigungs-Inbox mit ungelesenen-Badge in der Navigationsleiste | Muss | Neu |
| FR-06 | Fristenkalender-Ansicht: Monats- und JahresÃ¼bersicht aller bevorstehenden Fristen | Soll | Neu |
| FR-07 | .ics-Kalender-Export fÃ¼r alle Fristen (Outlook, Google Calendar, Apple Calendar kompatibel) | Soll | Neu |
| FR-08 | Erinnerungen kÃ¶nnen jederzeit deaktiviert, reaktiviert oder angepasst werden | Muss | Neu |

#### 7.1.4 KostenÃ¼bersicht und Analytik

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| KO-01 | Gesamtausgaben pro Monat: jÃ¤hrliche Abos werden auf monatliche Basis umgerechnet und addiert | Muss | Neu |
| KO-02 | Projektierte Jahreskosten auf Basis aller aktiven VertrÃ¤ge | Muss | Neu |
| KO-03 | Donut-Chart / Tortendiagramm der Ausgaben nach Kategorie | Muss | Neu |
| KO-04 | Liste der Top-10-Anbieter nach Ausgaben in aufsteigender Sortierung | Soll | Neu |
| KO-05 | Zahlungskalender: chronologische Ansicht der nÃ¤chsten 12 Monatszahlungen (Cash-Flow-Sicht) | Soll | Neu |
| KO-06 | Monatsvergleich: aktuelle Monatskosten vs. Vormonat mit Delta-Anzeige | Soll | Neu |
| KO-07 | CSV-Export aller Vertragsdaten und Kosten als strukturierte Tabelle | Muss | Neu |
| KO-08 | PDF-Kostenbericht mit GesamtÃ¼bersicht, Kategorie-Breakdown und Liste aller VertrÃ¤ge | Soll | Neu |

#### 7.1.5 KÃ¼ndigungsvorlagen

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| KV-01 | Vorlagenbibliothek mit professionellen KÃ¼ndigungsschreiben in Deutsch (DE), Ã–sterreichisch-Deutsch (AT) und Englisch (EN) | Muss | Neu |
| KV-02 | Template-Typen: Ordentliche KÃ¼ndigung zum Vertragsende / KÃ¼ndigung unter Berufung auf KÃ¼ndigungsfrist / NichtverlÃ¤ngerungs-BestÃ¤tigung fÃ¼r Jahresabos | Muss | Neu |
| KV-03 | AuÃŸerordentliche KÃ¼ndigung als separates Template mit markiertem Hinweis zur RechtsprÃ¼fung | Soll | Neu |
| KV-04 | Auto-BefÃ¼llung der Vorlage mit Vertragsdaten: Anbieter-Name, Vertragsdatum, Kundennummer (wenn hinterlegt), Firmendaten des Nutzers | Muss | Neu |
| KV-05 | Download der ausgefÃ¼llten Vorlage als PDF und DOCX | Muss | Neu |
| KV-06 | Klar sichtbarer rechtlicher Disclaimer: â€žDiese Vorlage ist unverbindlich. Im Zweifelsfall konsultieren Sie einen Rechtsanwalt." | Muss | Neu |

---

### 7.2 BasisfunktionalitÃ¤ten

#### 7.2.1 Rollen, Anmeldung und Registrierung

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| RB-01 | Drei Rollen: Admin (Vollzugriff inkl. Nutzerverwaltung), Editor (alle Funktionen auÃŸer Nutzerverwaltung), Viewer (nur lesen) | Muss | Neu |
| RB-02 | Registrierung per E-Mail mit Passwort und Double-Opt-In-BestÃ¤tigung via Supabase Auth | Muss | Neu |
| RB-03 | Anmeldung per E-Mail/Passwort sowie Social Login via Google und Microsoft | Soll | Neu |
| RB-04 | Passwort zurÃ¼cksetzen per E-Mail-Link | Muss | Neu |
| RB-05 | Organisations-Account: ein gemeinsamer Account fÃ¼r eine GmbH / ein Unternehmen mit mehreren Nutzern | Muss | Neu |
| RB-06 | Row Level Security (RLS) in Supabase: Nutzer sehen ausschlieÃŸlich die Daten ihrer eigenen Organisation | Muss | Neu |

#### 7.2.2 Organisationsverwaltung und Audit

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| OV-01 | Admin kann Nutzer per E-Mail-Einladung mit Rollenauswahl (Admin / Editor / Viewer) einladen | Muss | Neu |
| OV-02 | Eingeladener erhÃ¤lt E-Mail mit Aktivierungslink und wird nach Annahme der Organisation zugeordnet | Muss | Neu |
| OV-03 | Admin kann Rollen Ã¤ndern und Nutzer jederzeit aus der Organisation entfernen | Muss | Neu |
| OV-04 | Audit-Log: Protokoll aller Ã„nderungen mit Nutzer, Zeitstempel, Aktion und Vorher/Nachher-Diff | Soll | Neu |

#### 7.2.3 Navigation, Benachrichtigungen und Darstellung

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| NV-01 | Breadcrumb-Navigation auf allen Unterseiten | Muss | Neu |
| NV-02 | Dashboard als Startseite: KostenÃ¼bersicht, anstehende Fristen (nÃ¤chste 30 Tage), zuletzt bearbeitete VertrÃ¤ge | Muss | Neu |
| NV-03 | Dunkel/Hell-Modus in den Einstellungen umschaltbar | Soll | Neu |
| NV-04 | Responsives Design: vollstÃ¤ndig nutzbar auf Desktop, Tablet und Mobilbrowser | Muss | Neu |
| BN-01 | E-Mail-Benachrichtigung bei bevorstehenden Fristen gemÃ¤ÃŸ konfigurierter Erinnerungsregel | Muss | Neu |
| BN-02 | In-App-Benachrichtigungs-Inbox mit ungelesenen-Badge in der Navigation | Muss | Neu |

#### 7.2.4 Spracheinstellungen und Profilseite

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| SP-01 | Sprachumschaltung Deutsch und Englisch in den Einstellungen ohne Seitenneuladung | Muss | Neu |
| SP-02 | Datum- und WÃ¤hrungsformat richten sich nach der gewÃ¤hlten Sprache (DE: dd.mm.yyyy / EN: mm/dd/yyyy) | Soll | Neu |
| PR-01 | Profilseite: Name, E-Mail-Adresse, Unternehmensname, Sprache, Passwort Ã¤ndern | Muss | Neu |
| PR-02 | DSGVO-Rechte: Self-Service Konto- und DatenlÃ¶schung sowie vollstÃ¤ndiger Datenexport (JSON/CSV) auf Anfrage (Art. 17 und 20 DSGVO) | Muss | Neu |

#### 7.2.5 Rechtliches und GeschÃ¤ftsmodell

| ID | Anforderung | PrioritÃ¤t | Status |
|---|---|---|---|
| RE-01 | AGB, Impressum und DatenschutzerklÃ¤rung als eigene, verlinkbare Seiten in der App | Muss | Neu |
| RE-02 | Cookie-Banner bei erstem Aufruf, DSGVO-konform; Empfehlung: Plausible Analytics (cookiefrei) statt Google Analytics | Muss | Neu |
| RE-03 | Vier-Tier-Preismodell: Free (5 VertrÃ¤ge, 1 Nutzer) / Starter (â‚¬19/Monat, 30 VertrÃ¤ge, 3 Nutzer) / Pro (â‚¬49/Monat, unbegrenzt, 10 Nutzer) / Business (â‚¬99/Monat, unbegrenzt, 25 Nutzer) | Muss | Neu |
| RE-04 | Upgrade von Free auf bezahlte Tiers direkt in der App via Stripe | Muss | Neu |
| RE-05 | Server ausschlieÃŸlich in der EU: Supabase EU-Region (eu-central-1, Frankfurt), Vercel fra1 (Frankfurt) | Muss | Neu |
| RE-06 | Data Processing Agreement (DPA) mit allen Drittanbietern (Supabase, Vercel, Azure, E-Mail-Service) vor Launch abgeschlossen | Muss | Neu |

---

### 7.3 Scope: Was ist Version 1 und was nicht

| In Scope â€” Version 1 | Out of Scope â€” ab Version 2 und spÃ¤ter |
|---|---|
| OCR-Upload (PDF, Foto) mit Review-Flow | E-Mail-Postfach-Scan (IMAP-Integration) |
| Manueller Erfassungsweg | KI-basierte Vertragskostenempfehlungen |
| Vertrags- und AboÃ¼bersicht (Karten- und Listenansicht) | Bankkonto-Integration (PSD2/Open Banking) |
| Proaktive Fristerinnerungen per E-Mail und In-App | Native iOS/Android-App |
| KostenÃ¼bersicht, Donut-Chart, Monatsvergleich | Automatisches KÃ¼ndigen per API |
| CSV- und PDF-Export | Multi-Mandanten-Modul fÃ¼r Kanzleien |
| KÃ¼ndigungsvorlagen DE/AT/EN (PDF + DOCX) | Buchhaltungs-Integration (DATEV, Lexoffice) |
| Multi-User: Admin / Editor / Viewer | Branchenvergleich (Benchmark-Daten) |
| Organisationseinladung per E-Mail | White-Label / Reseller-Programm |
| Stripe-Abonnementverwaltung | Mehrsprachige Vorlagen (FR, ES, IT) |
| DSGVO-Rechte: DatenlÃ¶schung und -export | KI-Chat-Interface Ã¼ber eigene Vertragssammlung |
| AGB, DatenschutzerklÃ¤rung, Cookie-Banner | Vertragsverhandlungs-Assistent |
| Dunkel/Hell-Modus, Sprachumschaltung DE/EN | Semantische Suche (pgvector RAG) |

---

## 8. Chancen und Risiken

### 8.1 Chancen

| Chance | BegrÃ¼ndung |
|---|---|
| Strukturell wachsende Zielgruppe | SaaS-Abos verdoppeln sich bis 2028 im KMU-Markt. Jedes neue Abo ist ein weiterer Nutzergrund. |
| DSGVO als dauerhafter Selektionsvorteil | US-Hosting ist fÃ¼r DACH-KMU mit sensiblen Vertragsdaten strukturell unattraktiv. Ein EU-native Anbieter gewinnt dieses Argument dauerhaft. |
| Regulatorik schafft Zwangsnachfrage | DSGVO, LkSG, CSRD und EU AI Act erzwingen strukturierte Vertragsdokumentation â€” ohne dass Vertragsmanager aktiv verkauft werden muss. |
| Kein neutraler Vollservice-Anbieter im DACH-KMU-Segment | Die Kombination aus OCR-Erfassung, proaktivem Fristmanagement und Kostenanalytik in einem DSGVO-nativen Produkt gibt es nicht. Die LÃ¼cke ist offen und zugÃ¤nglich. |
| Messbar schneller ROI | Forrester (2023): Im ersten Monat nach EinfÃ¼hrung entdecken Nutzer durchschnittlich 2,3 unbekannte oder ungenutzte VertrÃ¤ge. Eine Ersparnis von einem Jahresabo amortisiert das Jahresabonnement in der Regel vollstÃ¤ndig. |
| Version 1 ohne kritische AbhÃ¤ngigkeiten | Kein Partnervertrag, keine BehÃ¶rdengenehmigung nÃ¶tig. Start ist unmittelbar mÃ¶glich. Kein Gatekeeper kann den Marktzugang blockieren. |

### 8.2 Risiken

| Risiko | Warum es eintreten kann | GegenmaÃŸnahme |
|---|---|---|
| OCR-QualitÃ¤t bei unstrukturierten Dokumenten | Handschriften, schlecht gescannte PDFs, nicht-standardisierte Layouts kÃ¶nnen Extraktion auf 60â€“70 % Genauigkeit reduzieren | Review-Flow als Pflichtabschnitt nach jeder Extraktion â€” OCR ist Entwurf, nicht Endergebnis. Fehlertoleranz ist baulich integriert. |
| Cold-Start-Problem: Produkt hat erst nach 5+ EintrÃ¤gen Wert | Leeres Dashboard liefert keinen unmittelbaren Nutzen. FrÃ¼her Churn, wenn Onboarding scheitert | Guided Onboarding mit Fortschrittsanzeige, E-Mail-Sequenz in den ersten 14 Tagen, erster messbarer Mehrwert nach 3 erfassten VertrÃ¤gen sichtbar |
| Zahlungsbereitschaft fÃ¼r â€žVertragsmanagement" | KMU ordnen Vertragsmanagement als â€žnice to have" ein, nicht als Pflichtausgabe | Freemium-Einstieg mit 5 kostenlosen VertrÃ¤gen senkt HÃ¼rde auf null. Conversion Ã¼ber messbaren Mehrwert (entdeckte Ersparnisse). |
| Wechsel zwischen OCR-Providern (PreiserhÃ¶hung, Dienstaustritt) | AbhÃ¤ngigkeit von einem einzigen Anbieter schafft Preisrisiko | Abstrakte OCR-Service-Schnittstelle von Tag 1 â€” Providerwechsel erfordert nur neue Klasse, keine Datenbankmigration |
| Etablierte Anbieter schlieÃŸen die LÃ¼cke | DocuSign oder ein europÃ¤ischer Wettbewerber baut OCR + KÃ¼ndigungsvorlagen nach | DSGVO-Positionierung ist fÃ¼r US-Anbieter strukturell schwer replizierbar. First-Mover-Vorteil durch schnellen Launch. |
| Regulatorische Anforderungen beim Zahlungsmodell | Als Zahlungsabwickler greifen PSD2-Anforderungen | Stripe Ã¼bernimmt gesamte PSD2-Compliance als zertifizierter Zahlungsdienstleister. Kein eigenes Lizenzerwerb nÃ¶tig. |

---

## 9. Umsetzungsplan Version 1

### 9.1 Entwicklungsansatz

Die Entwicklung erfolgt mit GitHub Copilot als aktivem Implementierungswerkzeug. GitHub Copilot schreibt den GroÃŸteil des Codes, der Entwickler Ã¼bernimmt Review, Architekturentscheidungen und QualitÃ¤tssicherung. Das ermÃ¶glicht die Umsetzung von Version 1 in 5 Werktagen.

**Technologiestack fÃ¼r Version 1:**

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, TypeScript, shadcn/ui Komponenten
- **Backend / Datenbank:** Supabase (PostgreSQL mit Row Level Security, Auth, Object Storage) â€” EU-Region Frankfurt
- **OCR-Engine:** Azure Document Intelligence (primÃ¤r), Google Cloud Vision (Fallback), provider-agnostisch hinter eigenem Interface
- **E-Mail-Service:** Resend oder Brevo (EU-Anbieter, DSGVO-konform)
- **Payment:** Stripe (Abonnementverwaltung, SEPA, Kreditkarte)
- **Hosting und Deployment:** Vercel (fra1 Frankfurt, automatisches Deployment aus GitHub)
- **Analytics:** Plausible Analytics (EU-gehostet, cookiefrei, kein DSGVO-Banner nÃ¶tig)

### 9.2 Umsetzungsplan 5 Werktage

| Tag | Fokus | Inhalt | Wer / womit |
|---|---|---|---|
| Tag 1 | Anforderungen erfassen | Anforderungsdokument finalisieren und mit Stakeholdern abstimmen, Datenbankschema vollstÃ¤ndig entwerfen (Tabellen, RLS-Regeln, Indizes), Komponentenstruktur und Routing-Konzept (Next.js App Router) festlegen, OCR-Provider-Entscheidung treffen und API-Zugang beantragen, alle technischen AbhÃ¤ngigkeiten und deren Versionen fixieren | Entwickler und GitHub Copilot |
| Tag 2 | Rahmenbedingungen und erster Prototyp (OCR) | Vercel-Deployment-Pipeline aus GitHub einrichten (fra1 Frankfurt), Supabase-Projekt in EU-Region aufsetzen (Schema, RLS-Policies, Auth-Konfiguration), Strato-Domain konfigurieren und mit Vercel verknÃ¼pfen, Basis-UI-Framework aufsetzen (Next.js 15, Tailwind, shadcn/ui), Azure Document Intelligence hinter Abstract-Interface anbinden, Upload-Komponente (Drag-Drop + Kamera-Mobile), Review-Flow-UX (FeldbestÃ¤tigung und -korrektur), optionale Dokumentenspeicherung Supabase Storage, manueller Erfassungsweg. Zwischenstand: lauffÃ¤higer OCR-Upload mit Review-Flow | Entwickler und GitHub Copilot |
| Tag 3 bis 4 | Alle Kernfunktionen | Dashboard (Karten- und Listenansicht), Status-Badge-Logik, Freitext-Suche, Filter und Sortierung, Detail-Ansicht mit Bearbeitungsmodus, Kategorieverwaltung (System + benutzerdefiniert). Fristberechnungslogik (Vertragslaufzeit + KÃ¼ndigungsfrist â†’ KÃ¼ndigungsdatum), tÃ¤glicher Cron-Job fÃ¼r FristprÃ¼fung, E-Mail-Versand (Resend/Brevo), In-App-Benachrichtigungs-Inbox, Fristenkalender-Ansicht, .ics-Export. Monats-/Jahresauswertung (anteilige Umrechnung), Donut-Chart nach Kategorie, Top-Anbieter-Liste, Zahlungskalender, Monatsvergleich, CSV-Export, PDF-Kostenbericht. Template-Engine fÃ¼r DE/AT/EN-Vorlagen, Auto-BefÃ¼llung mit Vertragsdaten, PDF- und DOCX-Generierung, rechtlicher Disclaimer. Organisations-Einladungsflow, Rollen-Rechtemodell (Admin/Editor/Viewer), Audit-Log. GitHub Copilot schreibt den Code, Entwickler reviewt und korrigiert | Entwickler und GitHub Copilot |
| Tag 5 | QA und Launch | Manuelles Testen aller Kernfunktionen (OCR-Upload, Fristberechnung, E-Mail-Erinnerung, KostenÃ¼bersicht, KÃ¼ndigungsvorlage, Rollen), Fehlerkorrektur und Edge-Cases, Plausible Analytics einbinden, direkter Service-Launch | Entwickler und GitHub Copilot |

**Hinweis:** Die 5-Tage-Umsetzung produziert einen lauffÃ¤higen Dienst mit allen Kernfunktionen. Das ist kein Endprodukt, aber eine nutzbare Version 1, die echter Nutzung standhalten kann. Payment-Integration und rechtliche Dokumente (AGB, DatenschutzerklÃ¤rung) werden in einem separaten Folgeschritt nach dem Launch ergÃ¤nzt. QualitÃ¤tssicherung und Stabilisierung laufen nach dem 5-Tage-Sprint weiter.

---

## Quellenverzeichnis

| Quelle | Inhalt |
|---|---|
| Bitkom Digitalatlas 2025 | KMU-SaaS-Adoptionsrate, 34 Abos/Unternehmen im Median, bitkom.org |
| Gartner Technology Insights for Software Asset Management, 2024 | Nur 47 % der bezahlten Softwarelizenzen werden genutzt, 25â€“30 % Kostenreduktion durch SAM, gartner.com |
| Gartner Forecast: Public Cloud Services, Worldwide, 2025 | SaaS-Markt 317 Mrd. USD (2024), 820 Mrd. USD bis 2030, gartner.com |
| Forrester Research â€” The Total Economic Impact of Contract Lifecycle Management Solutions, 2023 | ROI 337 % Ã¼ber 3 Jahre, durchschnittlich 2,3 unbekannte VertrÃ¤ge im ersten Monat entdeckt, forrester.com |
| C+R Research â€” Subscription Economy Consumer Survey, 2024 | 17â€“23 % der Abo-Ausgaben fÃ¼r ungenutzte Dienste, crresearch.com |
| Statistisches Bundesamt, Unternehmensregister, 2025 | 3,5 Millionen KMU in Deutschland, destatis.de |
| IFM Bonn â€” KMU-Definition und Marktdaten, 2024 | KMU beschÃ¤ftigen 55 % der Arbeitnehmer, erzielen 35 % des Umsatzes, ifm-bonn.org |
| Vakul Agarwal et al. â€” Contract Analytics with Natural Language Processing, ACM Digital Library, 2022 | NLP-Vertragsextraktion erreicht 85â€“93 % Genauigkeit mit Human-in-the-Loop, ohne Review nur 68â€“75 %, dl.acm.org |
| McKinsey Global Survey â€” The State of AI in 2024 | 65 % der Unternehmen nutzen GenAI, Top-Anwendungsfall Dokumentenverarbeitung 43 %, mckinsey.com |
| European Commission â€” SME Performance Review: Digital Transformation, 2023 | 22 % der EU-KMU nutzen Cloud-CLM, 58 % noch mit Office-Dokumenten, ec.europa.eu |
| EU-DSGVO (VO 2016/679), insb. Art. 5, 6, 17, 20, 28, 30, 32, 33 | Rechtsgrundlagen, Betroffenenrechte, Auftragsverarbeitung, Datenpannenmeldung, eur-lex.europa.eu |
| EU AI Act (Verordnung 2024/1689) | Risikoklassifikation KI-Systeme, Transparenzpflichten, eur-lex.europa.eu |
| Lieferkettensorgfaltspflichtengesetz (LkSG), Â§3 ff., Deutschland 2023 | Sorgfaltspflichten und Dokumentationsanforderungen, gesetze-im-internet.de |
| CSRD-Richtlinie 2022/2464 | Nachhaltigkeitsberichterstattung ab 500 MA (2025) und 250 MA (2026), eur-lex.europa.eu |
| G2 â€” CLM Software Market Overview, April 2026 | Konkurrenzvergleich DocuSign CLM, Ironclad, PandaDoc, g2.com |
| Gartner Magic Quadrant for Contract Life Cycle Management, 2024 | Marktpositionierung Enterprise-Anbieter, KMU-LÃ¼cke dokumentiert, gartner.com |

---

*Dokument erstellt: 14. April 2026 | Version 1.0 | Status: Zur Freigabe eingereicht*
*Alle Marktdaten basieren auf zum Erstellungszeitpunkt Ã¶ffentlich verfÃ¼gbaren Quellen. FÃ¼r bindende rechtliche Aussagen (insbesondere DSGVO-KonformitÃ¤t, KÃ¼ndigungsvorlagen) ist juristischer Beistand erforderlich.*


