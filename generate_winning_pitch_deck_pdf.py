import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # Skip cover page

        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#0F172A"))
        self.drawString(54, 11 * inch - 36, "EXAMRESQ — THE 3 GAME-CHANGING PILLARS & WINNING PITCH BLUEPRINT")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawRightString(8.5 * inch - 54, 11 * inch - 36, "HACKATHON & INVESTOR STRATEGY DOSSIER")
        
        # Top Rule
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.75)
        self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)

        # Bottom Rule & Page Number
        self.line(54, 45, 8.5 * inch - 54, 45)
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        self.drawString(54, 32, "ExamResQ: Resilient & Trustworthy Online Assessment Ecosystem • Confidential Pitch Deck")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 32, page_str)
        self.restoreState()

def build_pdf(filename="ExamResQ_Winning_Pitch_Deck_and_The_Three_Pillars.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Color Palette
    c_navy = colors.HexColor("#0F172A")        # Deep Slate Primary
    c_blue = colors.HexColor("#1E40AF")        # Royal Blue Accent
    c_crimson = colors.HexColor("#991B1B")     # Crimson Alert / Anti-Corruption
    c_emerald = colors.HexColor("#166534")     # Forest Emerald / Empathy
    c_body = colors.HexColor("#334155")        # Slate Text
    c_muted = colors.HexColor("#64748B")       # Secondary Slate
    c_border = colors.HexColor("#E2E8F0")      # Divider border
    c_bg_light = colors.HexColor("#F8FAFC")    # Card / Box background
    c_code_bg = colors.HexColor("#0F172A")     # Terminal background

    # Typography Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=c_navy,
        spaceAfter=8
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=c_blue,
        spaceAfter=15
    )

    meta_label = ParagraphStyle(
        'CoverMetaLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=c_navy
    )

    meta_val = ParagraphStyle(
        'CoverMetaValue',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=c_body
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=c_navy,
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=c_blue,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    h3_style = ParagraphStyle(
        'H3',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=c_navy,
        spaceBefore=8,
        spaceAfter=3,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_body,
        spaceAfter=5
    )

    callout_text = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_navy
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=colors.white
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=c_body
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10.5,
        textColor=c_navy
    )

    story = []

    # =========================================================================
    # COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 10))
    badge_table = Table(
        [[Paragraph("<b>EXECUTIVE HACKATHON DOSSIER • THE WINNING 3 PILLARS STRATEGY</b>", ParagraphStyle('Bdg', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=c_blue))]],
        colWidths=[504]
    )
    badge_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#BFDBFE")),
        ('PADDING', (0,0), (-1,-1), 5),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(badge_table)
    story.append(Spacer(1, 12))

    story.append(Paragraph("EXAMRESQ: THE 3 GAME-CHANGING PILLARS THAT GUARANTEE HACKATHON VICTORY", title_style))
    story.append(Paragraph("How to Turn a Non-Technical Idea Pitch into an Unbeatable National Examination Solution", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=c_blue, spaceBefore=4, spaceAfter=12))

    exec_summary_box = Table(
        [[Paragraph("<b>EXECUTIVE CHARTER & STRATEGIC POSITIONING:</b><br/>"
                    "High-stakes examinations in India (JEE, NEET, CUET, State PSCs) are plagued by three systemic crises that no existing enterprise "
                    "portal (TCS iON, Prometric, Pearson VUE) has solved: <b>(1) Infrastructure Vulnerability</b> (single server cuts shut down 500 candidates), "
                    "<b>(2) Post-Exam Answer Tampering & Legal Scandals</b> (corrupt admins altering database records between exam close and result sync), and "
                    "<b>(3) Student Panic & Arbitrary Grace Marks</b> (arbitrary human decisions causing massive student distress and Supreme Court litigation). "
                    "This dossier outlines the <b>Holy Trinity of ExamResQ</b>: three revolutionary, patent-worthy concepts that transform a standard pitch "
                    "into an unassailable national victory.", callout_text)]],
        colWidths=[504]
    )
    exec_summary_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('LINELEFT', (0,0), (-1,-1), 3.5, c_blue),
        ('PADDING', (0,0), (-1,-1), 9),
    ]))
    story.append(exec_summary_box)
    story.append(Spacer(1, 15))

    # Meta Table
    meta_data = [
        [Paragraph("Project Name", meta_label), Paragraph("ExamResQ (Resilient & Trustworthy Online Assessment Ecosystem)", meta_val),
         Paragraph("Presentation Format", meta_label), Paragraph("Non-Technical / Strategic Pitch (Ideathon & B-Plan)", meta_val)],
        [Paragraph("Target Evaluators", meta_label), Paragraph("Hackathon Judges, EdTech Investors, NTA & Gov Reviewers", meta_val),
         Paragraph("Core Differentiators", meta_label), Paragraph("P2P Hive Mesh, Merkle Digital DNA, Empathy Co-Pilot", meta_val)],
        [Paragraph("Live Proof of Concept", meta_label), Paragraph("https://examresq.vercel.app (Verified React 19 App)", meta_val),
         Paragraph("Economic Value", meta_label), Paragraph("₹60+ Crore Saved per Re-Exam Avoided • Zero Court PILs", meta_val)],
    ]
    meta_table = Table(meta_data, colWidths=[105, 147, 105, 147])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 15))

    # The 3 Pillars Overview Matrix
    p_matrix = [
        [Paragraph("<b>THE PILLAR</b>", table_header), Paragraph("<b>THE HIDDEN INDUSTRY CRISIS</b>", table_header), Paragraph("<b>EXAMRESQ REVOLUTIONARY FIX</b>", table_header), Paragraph("<b>JUDGE IMPACT RATING</b>", table_header)],
        [Paragraph("<b>PILLAR 1:<br/>The Hive Mesh</b>", table_cell_bold), 
         Paragraph("Colleges depend on 1 local server and 1 internet wire. If a peon trips or cable cuts, 500 students freeze.", table_cell), 
         Paragraph("<b>Zero-Server, Zero-Internet P2P Mesh:</b> Student PCs back up each other locally. 3-second terminal hot-swapping.", table_cell), 
         Paragraph("<b>\"Unprecedented Engineering\"</b><br/>(Solves physical infra)", table_cell_bold)],
        [Paragraph("<b>PILLAR 2:<br/>The Digital DNA</b>", table_cell_bold), 
         Paragraph("Evening database tampering scam: Corrupt lab admins alter answers for money between 1 PM and 4 PM.", table_cell), 
         Paragraph("<b>Immutable Merkle Time-Lock & Student Truth Receipt:</b> Even NTA chairman cannot alter an answer without red alert.", table_cell), 
         Paragraph("<b>\"Anti-Corruption Masterstroke\"</b><br/>(Solves legal trust)", table_cell_bold)],
        [Paragraph("<b>PILLAR 3:<br/>The Empathy Shield</b>", table_cell_bold), 
         Paragraph("Screen blinks $\rightarrow$ Student heart rate 150 BPM $\rightarrow$ Panic crying $\rightarrow$ Invigilator shouts $\rightarrow$ Arbitrary grace marks scam.", table_cell), 
         Paragraph("<b>Anti-Panic Co-Pilot & Silent SOS:</b> 60s breathing buffer, millisecond time parity, zero-invigilator-bias tracking.", table_cell), 
         Paragraph("<b>\"Deep Human Empathy\"</b><br/>(Wins hearts & tears)", table_cell_bold)],
    ]
    pm_table = Table(p_matrix, colWidths=[85, 145, 174, 100])
    pm_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_navy),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(pm_table)

    story.append(PageBreak())

    # =========================================================================
    # PILLAR 1: THE SELF-HEALING HIVE MESH
    # =========================================================================
    story.append(Paragraph("Pillar 1: The Self-Healing Hive Mesh (Zero-Server, Zero-Internet Exam Hall)", h1_style))
    story.append(Paragraph(
        "<b>The Fundamental Flaw in Current Systems (TCS iON, Pearson VUE, Prometric):</b><br/>"
        "Every existing examination platform relies on a 20-year-old client-server paradigm. A physical testing centre installs a "
        "heavy server in the college administrative room and requires an uninterrupted fiber leased line. If the local server suffers a power spike, "
        "or a municipal excavator cuts the roadside fiber cable, <b>all 500 candidates in the examination hall are simultaneously frozen</b>. "
        "The centre collapses, police are deployed, and a national re-examination is mandated.",
        body_style
    ))

    p1_box = Table(
        [[Paragraph("<b>EXAMRESQ BREAKTHROUGH: DECENTRALIZED P2P HIVE TOPOLOGY</b><br/>"
                    "ExamResQ completely eliminates the requirement for a central local server. Using browser-native WebRTC peer data channels, "
                    "every candidate workstation in the examination hall connects into a self-healing, air-gapped local mesh network:<br/>"
                    "• <b>Peer Cross-Replication:</b> As Candidate #14 selects an answer, an encrypted, zero-knowledge payload is silently replicated to neighboring workstations #15 and #16.<br/>"
                    "• <b>The 3-Second Hot-Swap:</b> If Workstation #14 suffers a motherboard failure or power cord disconnection, the candidate is escorted to any vacant terminal. Upon entering their roll number and biometric PIN, the neighbouring peer computers instantly inject the candidate's exact state, uncommitted responses, and timer seconds in under 3 seconds.<br/>"
                    "• <b>Single-Packet Cloud Bridge:</b> Even if the wide-area internet is completely severed for 3 hours, the moment ANY single device in the room captures 2 seconds of 2G/hotspot connectivity, the entire hall's synchronized ledger bursts to the national cloud securely.", callout_text)]],
        colWidths=[504]
    )
    p1_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('LINELEFT', (0,0), (-1,-1), 3.5, c_blue),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(p1_box)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Why Legacy Giants Cannot Copy This:</b>", h3_style))
    story.append(Paragraph(
        "TCS iON and global giants operate on monolithic enterprise codebases written in the mid-2000s. Their software architecture assumes "
        "a centralized SQL database transaction for every state transition. Re-architecting their systems to support P2P browser mesh would require "
        "a complete multi-hundred-crore rewrite of their core platform. ExamResQ was built from the ground up on modern edge computing standards.",
        body_style
    ))
    story.append(Spacer(1, 10))

    # =========================================================================
    # PILLAR 2: THE DIGITAL DNA TRUTH SEAL
    # =========================================================================
    story.append(Paragraph("Pillar 2: The Digital DNA Truth Seal (Anti-Mafia Cryptographic Exam Vault)", h1_style))
    story.append(Paragraph(
        "<b>The Dark Underbelly of Online Examinations (Post-Exam Database Manipulation):</b><br/>"
        "In almost every high-profile exam fraud investigated by the CBI and State Police (Vyapam, Haryana CET, SSC, NEET PG), "
        "cheating does not occur by hacking firewalls during the test. It occurs during the <b>'Golden Window' between 1:00 PM and 4:00 PM</b>. "
        "After students vacate the hall, corrupt lab coordinators log into the central SQL database, locate pre-arranged roll numbers, and execute "
        "unauthorized SQL updates: changing blank or incorrect options into correct keys. In conventional platforms, database updates look identical "
        "to genuine user submissions.",
        body_style
    ))

    p2_box = Table(
        [[Paragraph("<b>EXAMRESQ BREAKTHROUGH: CONTINUOUS MERKLE DAG TIME-LOCK & VERIFIABLE PROOF</b><br/>"
                    "ExamResQ adopts a Zero-Trust Cryptographic Architecture that treats everyone—including the exam center owner and the cloud admin—as untrusted:<br/>"
                    "• <b>Sequential Hash Chaining:</b> The moment a candidate clicks Option 'B' at 10:42:15 AM, the response is mathematically hashed with the candidate's station biometric token, hardware entropy, exact millisecond timestamp, and the hash of the preceding question.<br/>"
                    "• <b>The Mathematical Alarm Bell:</b> If an administrator opens the SQL database at 3:30 PM to change 'B' to 'C', the entire Merkle hash tree breaks instantly. The system triggers an autonomous forensic alarm: <i>'INTEGRITY BREACH: Sequence #14 modified post-examination conclusion.'</i><br/>"
                    "• <b>The Candidate Truth Receipt:</b> Upon submission, candidates receive a 64-character cryptographic hash receipt (via screen & SMS). If any discrepancy arises during result declaration, the candidate can present their hash in High Court. A simple mathematical verification proves whether the answer was modified by NTA's servers or submitted legitimately. Zero corruption. Zero ambiguous lawsuits.", callout_text)]],
        colWidths=[504]
    )
    p2_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('LINELEFT', (0,0), (-1,-1), 3.5, c_crimson),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(p2_box)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>The Legal Shift:</b>", h3_style))
    story.append(Paragraph(
        "Traditional platforms rely on human trust in server administrators. ExamResQ replaces human trust with immutable mathematical verification. "
        "Even the Chairman of the testing agency cannot alter a candidate's response without leaving indelible mathematical evidence.",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PILLAR 3: THE ANTI-PANIC CO-PILOT & EMOTIONAL SHIELD
    # =========================================================================
    story.append(Paragraph("Pillar 3: The Anti-Panic Co-Pilot & Millisecond Justice Protocol", h1_style))
    story.append(Paragraph(
        "<b>The Human Tragedy Behind Network Glitches (Student Panic & Suicide Epidemic):</b><br/>"
        "In competitive examinations, students carry the hopes and economic survival of their entire families. When an examination terminal freezes, "
        "the psychological shock triggers acute cognitive paralysis. Heart rates spike to 150 BPM, candidates begin hyperventilating, and arrogant "
        "invigilators scold them into silence. When ordinary systems reboot, the countdown timer immediately ticks downward, forcing candidates into "
        "erratic guessing. This emotional trauma is the primary driver of post-exam despair and litigation.",
        body_style
    ))

    p3_box = Table(
        [[Paragraph("<b>EXAMRESQ BREAKTHROUGH: COGNITIVE RESET & MILLISECOND JUSTICE</b><br/>"
                    "ExamResQ is the world's first examination ecosystem designed around human psychology and legal fairness:<br/>"
                    "• <b>The 60-Second Cognitive Reset Buffer:</b> When a workstation reconnects after an interruption, the exam timer DOES NOT immediately start! The system displays an empathetic, calming interface: <i>'Breathe easy, Adarsh. Your answers are 100% secured in our cryptographic safe. Your timer is paused. Take a sip of water. Exactly 2 minutes and 15 seconds have been credited to your session.'</i> The candidate recovers mental composure before resuming.<br/>"
                    "• <b>The Silent Digital SOS (No Invigilator Bullying):</b> Students can silently flag technical glitches or request rough sheets directly from their screen with 1 click. If the center invigilator fails to respond within 90 seconds, the alert auto-escalates to the District Observer and Central Ministry Command.<br/>"
                    "• <b>The NEET 2024 Grace-Marks Killer (Millisecond Parity):</b> Traditional portals record only crude login/logout times, forcing testing agencies to guess 'grace marks' (which caused nationwide protests in NEET 2024). ExamResQ logs keystrokes, mouse freezes, and frame delays at the millisecond level. If a workstation lagged for 134 seconds, the candidate receives precisely 134 compensatory seconds. Zero human bias. Zero Supreme Court PILs.", callout_text)]],
        colWidths=[504]
    )
    p3_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('LINELEFT', (0,0), (-1,-1), 3.5, c_emerald),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(p3_box)
    story.append(Spacer(1, 10))

    # Comprehensive Comparison Matrix
    story.append(Paragraph("Direct Comparison: ExamResQ vs Legacy Industry Giants", h2_style))
    comp_matrix = [
        [Paragraph("Feature / Capability", table_header), Paragraph("TCS iON / Prometric", table_header), Paragraph("Pearson VUE / Mettl", table_header), Paragraph("ExamResQ Ecosystem", table_header)],
        [Paragraph("<b>Local Server Failure</b>", table_cell_bold), Paragraph("Entire hall crashes; exam halted ❌", table_cell), Paragraph("Server reboot needed; session lost ❌", table_cell), Paragraph("<b>100% Zero-Server P2P Hive Mesh</b> ✅", table_cell_bold)],
        [Paragraph("<b>Physical PC Damage</b>", table_cell_bold), Paragraph("Lengthy manual paperwork; exam lost ❌", table_cell), Paragraph("Candidate re-assigned; answers lost ❌", table_cell), Paragraph("<b>3-Second Terminal Hot-Swap</b> ✅", table_cell_bold)],
        [Paragraph("<b>Post-Exam DB Edits</b>", table_cell_bold), Paragraph("Vulnerable to corrupt SQL updates ❌", table_cell), Paragraph("Audit logs can be bypassed ❌", table_cell), Paragraph("<b>Immutable Merkle DNA Chain Lock</b> ✅", table_cell_bold)],
        [Paragraph("<b>Candidate Proof</b>", table_cell_bold), Paragraph("No candidate receipt; agency word is final ❌", table_cell), Paragraph("No cryptographic receipt issued ❌", table_cell), Paragraph("<b>Verifiable Digital Truth Hash</b> ✅", table_cell_bold)],
        [Paragraph("<b>Post-Outage Student Panic</b>", table_cell_bold), Paragraph("Timer restarts immediately; high panic ❌", table_cell), Paragraph("Timer continues; candidate suffers ❌", table_cell), Paragraph("<b>60s Paused Cognitive Reset Buffer</b> ✅", table_cell_bold)],
        [Paragraph("<b>Compensatory Parity</b>", table_cell_bold), Paragraph("Arbitrary invigilator discretion ❌", table_cell), Paragraph("Static 5-min or zero buffer ❌", table_cell), Paragraph("<b>Exact Millisecond Mathematical Time</b> ✅", table_cell_bold)]
    ]
    c_table = Table(comp_matrix, colWidths=[110, 125, 125, 144])
    c_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_navy),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(c_table)

    story.append(PageBreak())

    # =========================================================================
    # THE 8-SLIDE WINNING PRESENTATION BLUEPRINT
    # =========================================================================
    story.append(Paragraph("The 8-Slide Pitch Deck Blueprint (Non-Technical Structure)", h1_style))
    story.append(Paragraph(
        "For non-technical hackathons, ideathons, and venture showcases, avoid code walks. Use this exact slide flow:",
        body_style
    ))

    slides = [
        ("Slide 1: The Hook & Brand", 
         "\"ExamResQ: Making High-Stakes Exams 100% Outage-Proof, Tamper-Proof, and Fair.\"",
         "Visual of broken cables vs seamless green shield. State mission: 'Turning fragile exam halls into indestructible digital safes.'"),
        ("Slide 2: The Villain (The Real Crisis in India)", 
         "Headlines: 'NEET Server Crash', 'Centre Blackout Triggers Protests', 'Supreme Court Scraps Grace Marks'.",
         "Explain: 50 Lakh students write exams on fragile Tier-2/3 internet. A single power surge destroys 2 years of hard work and triggers croron ka loss."),
        ("Slide 3: Why Existing Titans Fail (The Single-Point Trap)", 
         "Diagram showing TCS iON's single wire $\rightarrow$ single server $\rightarrow$ complete crash.",
         "State clearly: 'TCS iON was built in 2005. They assume the internet will never die. In Indian ground reality, internet ALWAYS fails.'"),
        ("Slide 4: Pillar 1 — The Self-Healing Hive Mesh", 
         "Diagram of 10 student PCs connected in a peer ring with zero central server.",
         "State: 'No central server in the college. Computers protect computers. If a PC catches fire, hot-swap to another terminal in 3 seconds.'"),
        ("Slide 5: Pillar 2 — The Digital DNA Truth Seal", 
         "Visual of cryptographic Merkle hash chain + student receiving SMS hash receipt.",
         "State: 'Eliminating the post-exam tampering scam. Even the NTA Chairman cannot edit an answer without triggering a red forensic alert.'"),
        ("Slide 6: Pillar 3 — The Empathy Co-Pilot & Parity Shield", 
         "Visual of soothing student reset screen + exact compensatory time counter.",
         "State: 'No more panic attacks. 60-second breathing buffer + exact millisecond compensatory time. Zero Supreme Court lawsuits.'"),
        ("Slide 7: Economic & National Feasibility", 
         "Financial Chart: Re-Exam Cost (₹45 Cr) vs ExamResQ Cost (₹3 per student).",
         "State: 'Zero new hardware required. Runs on existing potato PCs in government colleges. Saves ₹60+ Crore per year for testing boards.'"),
        ("Slide 8: The Grand Finale & Secret Weapon", 
         "Live link to deployed prototype + Team credentials.",
         "State: 'Not just an idea on paper: We have already built and deployed the live working engine at examresq.vercel.app.'")
    ]

    for s_title, s_head, s_desc in slides:
        s_box = Table(
            [[Paragraph(f"<b>{s_title}</b><br/>"
                        f"<b>Header:</b> {s_head}<br/>"
                        f"<b>Talking Point:</b> {s_desc}", callout_text)]],
            colWidths=[504]
        )
        s_box.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
            ('BOX', (0,0), (-1,-1), 0.5, c_border),
            ('PADDING', (0,0), (-1,-1), 5),
            ('LINELEFT', (0,0), (-1,-1), 3, c_blue),
        ]))
        story.append(s_box)
        story.append(Spacer(1, 4))

    story.append(PageBreak())

    # =========================================================================
    # THE 3-MINUTE VERBAL PITCH SCRIPT (HINGLISH / ENGLISH)
    # =========================================================================
    story.append(Paragraph("The 3-Minute Grand Finale Pitch Script (Verbal Delivery)", h1_style))
    story.append(Paragraph(
        "Deliver this speech with calm authority, eye contact, and emotional conviction:",
        body_style
    ))

    script_box = Table(
        [[Paragraph(
            "<b>[0:00 - 0:30] THE EMOTIONAL HOOK:</b><br/>"
            "<i>\"Respected Judges, har saal JEE, NEET, CUET aur Government exams me 50 lakh se zyada bache baithte hain. "
            "Inme se hazaron bache aise hote hain jinke mata-pita ne kheti bechkar ya karz lekar unhe coaching bheja hota hai. "
            "Lekin exam ke 45th minute par achanak computer screen blink hoti hai... 'Network Disconnected'. "
            "Bache ki heartbeat 150 ho jati hai, haath kaanpne lagte hain, aur invigilator chillakar kehta hai: 'Chup baitho, time nahi milega!' "
            "Ek single severed cable do saal ki tapasya aur ek bache ki zindagi barbaad kar deti hai. Hamne iska ilaaj banaya hai: <b>ExamResQ</b>.\"</i><br/><br/>"
            "<b>[0:30 - 1:15] THE THREE REVOLUTIONARY PILLARS:</b><br/>"
            "<i>\"ExamResQ is built on three unprecedented pillars that no global company has ever implemented:<br/>"
            "<b>Pillar 1: The Self-Healing Hive Mesh.</b> Existing portals like TCS iON depend on a central server in the principal's room. "
            "ExamResQ requires NO central server and NO mandatory internet. Hall ke 200 computers aapas me P2P Mesh se judte hain. "
            "Agar kisi bache ka computer jal bhi jaye, toh padosi computer se 3 second me uska paper restore ho jata hai.<br/>"
            "<b>Pillar 2: The Digital DNA Truth Seal.</b> India me asli scam exam ke baad 1 PM se 4 PM ke beech hota hai jab corrupt admins database me answers alter karte hain. "
            "ExamResQ me har answer cryptographic chain me bandha hota hai. Shaam ko NTA ka Chairman bhi ek letter badalna chahe, toh mathematical alarm baj jayega.<br/>"
            "<b>Pillar 3: The Empathy Co-Pilot.</b> NEET 2024 me grace marks ka scam hua kyuki kisi ko nahi pata tha bache ka kitna time kharab hua. "
            "ExamResQ millisecond level par lag count karke exact compensatory time auto-credit karta hai, aur bache ko 60-second ka breathing reset deta hai.\"</i><br/><br/>"
            "<b>[1:15 - 2:00] THE FEASIBILITY & SECRET WEAPON:</b><br/>"
            "<i>\"The best part? NTA ko ek naya laptop nahi khareedna. Yeh existing Tier-3 colleges ke Core i3 computers par chalta hai. "
            "Ek re-exam bachane ka matlab hai government ke ₹50 Crore bachna.<br/>"
            "Aur sir, yeh sirf hawa me idea nahi hai—we have already built, tested, and deployed the live working engine at <b>examresq.vercel.app</b>. "
            "Technology aisi honi chahiye jo insani galti aur cable cut se kisi bache ka bhavishya barbaad na hone de. Thank you!\"</i>",
            callout_text
        )]],
        colWidths=[504]
    )
    script_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#3B82F6")),
        ('LINELEFT', (0,0), (-1,-1), 4, c_blue),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(script_box)
    story.append(Spacer(1, 10))

    # Q&A Defense Matrix
    story.append(Paragraph("Judge Q&A Defense Matrix (Handling the 3 Toughest Questions)", h2_style))
    qa_matrix = [
        [Paragraph("Judge Question", table_header), Paragraph("Winning Non-Technical Defense", table_header)],
        [Paragraph("<b>\"Agar internet nahi hai, toh candidate answers badal kar cheating nahi kar lega?\"</b>", table_cell_bold),
         Paragraph("<i>\"Sir, bilkul yahi reason hai ki baki companies darti hain! Par ExamResQ me har click ek Sequential Hash Chain se sealed hota hai. Local storage me agar bacha inspect element karke ek byte bhi badlega, toh mathematical signature toot jayega aur invigilator ko instant red alert mil jayega. Cheating is mathematically impossible.\"</i>", table_cell)],
        [Paragraph("<b>\"TCS iON ke paas hazaron engineer hain, unhone Mesh kyu nahi banaya?\"</b>", table_cell_bold),
         Paragraph("<i>\"Sir, TCS iON 2005 ke legacy client-server architecture par khada hai. Unhe mesh banane ke liye apna 20 saal purana core backend fek kar zero se rewrite karna padega. ExamResQ ko humne 2026 ke modern WebRTC standards par edge-first banaya hai.\"</i>", table_cell)],
        [Paragraph("<b>\"Government agency NTA ise kyu apnayegi?\"</b>", table_cell_bold),
         Paragraph("<i>\"Sir, teen reasons: (1) Re-exam ka ₹50 Crore kharcha bachta hai, (2) Supreme Court me grace-marks wali beizzati aur PILs band hoti hain, aur (3) Zero new hardware cost—existing government lab PCs par chalta hai.\"</i>", table_cell)]
    ]
    qa_table = Table(qa_matrix, colWidths=[160, 344])
    qa_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_navy),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(qa_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    out_pdf = "ExamResQ_Winning_Pitch_Deck_and_The_Three_Pillars.pdf"
    if len(sys.argv) > 1:
        out_pdf = sys.argv[1]
    build_pdf(out_pdf)
