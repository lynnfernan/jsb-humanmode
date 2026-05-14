from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether, PageBreak
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
import re

NAVY = HexColor('#1c4b61')
SLATE = HexColor('#578ead')
CREAM = HexColor('#f1f1e2')
DARK = HexColor('#1a1a1a')

def make_styles():
    styles = {}
    styles['title'] = ParagraphStyle('title',
        fontName='Helvetica-Bold', fontSize=22, textColor=white,
        spaceAfter=4, spaceBefore=0, alignment=TA_CENTER, leading=26)
    styles['subtitle'] = ParagraphStyle('subtitle',
        fontName='Helvetica', fontSize=13, textColor=CREAM,
        spaceAfter=4, alignment=TA_CENTER, leading=16)
    styles['tagline'] = ParagraphStyle('tagline',
        fontName='Helvetica-Oblique', fontSize=11, textColor=CREAM,
        spaceAfter=0, alignment=TA_CENTER, leading=14)
    styles['h2'] = ParagraphStyle('h2',
        fontName='Helvetica-Bold', fontSize=14, textColor=white,
        spaceBefore=14, spaceAfter=4, leading=17,
        backColor=NAVY, leftPadding=8, rightPadding=8,
        topPadding=5, bottomPadding=5)
    styles['h3'] = ParagraphStyle('h3',
        fontName='Helvetica-Bold', fontSize=11, textColor=NAVY,
        spaceBefore=10, spaceAfter=3, leading=14)
    styles['h4'] = ParagraphStyle('h4',
        fontName='Helvetica-Bold', fontSize=10, textColor=SLATE,
        spaceBefore=6, spaceAfter=2, leading=13)
    styles['body'] = ParagraphStyle('body',
        fontName='Helvetica', fontSize=9.5, textColor=DARK,
        spaceBefore=2, spaceAfter=4, leading=14, alignment=TA_JUSTIFY)
    styles['bullet'] = ParagraphStyle('bullet',
        fontName='Helvetica', fontSize=9.5, textColor=DARK,
        spaceBefore=1, spaceAfter=2, leading=13,
        leftIndent=12, bulletIndent=0)
    styles['quote'] = ParagraphStyle('quote',
        fontName='Helvetica-Oblique', fontSize=10.5, textColor=NAVY,
        spaceBefore=6, spaceAfter=6, leading=15, alignment=TA_CENTER,
        leftIndent=30, rightIndent=30)
    styles['footer'] = ParagraphStyle('footer',
        fontName='Helvetica', fontSize=8, textColor=SLATE,
        alignment=TA_CENTER, leading=10)
    styles['zone_label'] = ParagraphStyle('zone_label',
        fontName='Helvetica-Bold', fontSize=12, textColor=white,
        spaceBefore=0, spaceAfter=2, leading=15, alignment=TA_LEFT)
    styles['zone_sub'] = ParagraphStyle('zone_sub',
        fontName='Helvetica-Oblique', fontSize=9, textColor=CREAM,
        spaceBefore=0, spaceAfter=0, leading=11, alignment=TA_LEFT)
    styles['small_label'] = ParagraphStyle('small_label',
        fontName='Helvetica-Bold', fontSize=8.5, textColor=SLATE,
        spaceBefore=0, spaceAfter=1, leading=10)
    return styles

def header_block(story, styles):
    # Navy header banner
    header_data = [[
        Paragraph('HUMAN MODE, ALWAYS', styles['title']),
    ]]
    sub_data = [[
        Paragraph('The Immersive Experience — Los Angeles | March 2026', styles['subtitle']),
    ]]
    tag_data = [[
        Paragraph('"You are not falling alone. The complete picture is visible if you know how to look."', styles['tagline']),
    ]]
    for data, bg in [(header_data, NAVY), (sub_data, NAVY), (tag_data, NAVY)]:
        t = Table(data, colWidths=[7.5*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), bg),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 12),
            ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ]))
        story.append(t)
    story.append(Spacer(1, 10))

def section_header(story, styles, text):
    t = Table([[Paragraph(text, styles['h2'])]], colWidths=[7.5*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), NAVY),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t)

def zone_card(story, styles, zone_num, title, concept, bullets, av_spec=None):
    header_para = Paragraph(f'ZONE {zone_num} — {title}', styles['zone_label'])
    concept_para = Paragraph(f'Concept: {concept}', styles['zone_sub'])
    header_content = [[header_para], [concept_para]]
    header_t = Table(header_content, colWidths=[7.3*inch])
    header_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), SLATE),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))

    body_items = []
    for b in bullets:
        body_items.append([Paragraph(f'• {b}', styles['bullet'])])
    if av_spec:
        body_items.append([Spacer(1, 4)])
        body_items.append([Paragraph(f'AV / Production: {av_spec}', styles['small_label'])])

    body_t = Table(body_items, colWidths=[7.3*inch])
    body_t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), HexColor('#f7f7ee')),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))

    outer = Table([[header_t], [body_t]], colWidths=[7.5*inch])
    outer.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 1, SLATE),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(KeepTogether([outer, Spacer(1, 8)]))

def summary_table(story, styles, rows):
    header = [
        Paragraph('Book Pillar', styles['small_label']),
        Paragraph('Activation', styles['small_label']),
    ]
    data = [header]
    for pillar, activation in rows:
        data.append([
            Paragraph(pillar, ParagraphStyle('tc', fontName='Helvetica-Bold',
                fontSize=9, textColor=NAVY, leading=12)),
            Paragraph(activation, ParagraphStyle('tc2', fontName='Helvetica',
                fontSize=9, textColor=DARK, leading=12)),
        ])
    t = Table(data, colWidths=[2.5*inch, 5*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), SLATE),
        ('TEXTCOLOR', (0,0), (-1,0), white),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [CREAM, white]),
        ('BOX', (0,0), (-1,-1), 0.5, SLATE),
        ('INNERGRID', (0,0), (-1,-1), 0.25, SLATE),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t)
    story.append(Spacer(1, 8))

def bling_table(story, styles, rows):
    data = []
    for element, detail in rows:
        data.append([
            Paragraph(element, ParagraphStyle('be', fontName='Helvetica-Bold',
                fontSize=9, textColor=NAVY, leading=12)),
            Paragraph(detail, ParagraphStyle('bd', fontName='Helvetica',
                fontSize=9, textColor=DARK, leading=12)),
        ])
    t = Table(data, colWidths=[2*inch, 5.5*inch])
    t.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0,0), (-1,-1), [CREAM, white]),
        ('BOX', (0,0), (-1,-1), 0.5, SLATE),
        ('INNERGRID', (0,0), (-1,-1), 0.25, SLATE),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t)
    story.append(Spacer(1, 8))

def questions_block(story, styles, questions):
    items = []
    for q in questions:
        items.append([Paragraph(f'☐  {q}', styles['bullet'])])
    t = Table(items, colWidths=[7.3*inch])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CREAM),
        ('BOX', (0,0), (-1,-1), 1, NAVY),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t)

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, letter[0], 28, fill=1, stroke=0)
    canvas.setFont('Helvetica', 8)
    canvas.setFillColor(CREAM)
    canvas.drawCentredString(letter[0]/2, 10,
        'Human Mode, Always  |  Jeffrey Sanchez-Burks  |  Executive Producer: Lynn Fernando  |  Draft May 2026')
    canvas.restoreState()

def build_pdf(output_path):
    doc = SimpleDocTemplate(output_path, pagesize=letter,
        leftMargin=0.5*inch, rightMargin=0.5*inch,
        topMargin=0.5*inch, bottomMargin=0.55*inch)

    styles = make_styles()
    story = []

    header_block(story, styles)

    # The Concept
    section_header(story, styles, 'THE CONCEPT')
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'Human Mode, Always: The Experience is not a conference. It is not a keynote with cocktails.',
        ParagraphStyle('bold_intro', fontName='Helvetica-Bold', fontSize=10.5,
            textColor=NAVY, leading=14, spaceAfter=4)))
    story.append(Paragraph(
        'It is a full-sensory journey through the core ideas of <i>MATTERING</i> — designed so that every guest '
        '<b>feels</b> the concepts in their body before they understand them in their mind. From the moment they '
        'arrive to the moment they leave, guests move through a series of activations that mirror the book\'s arc: '
        'the trap of tunnel vision, the shock of expanded awareness, the practice of the Scan Routine, and the '
        'recognition that they are not — and have never been — falling alone.',
        styles['body']))
    story.append(Paragraph(
        '<b>Target vibe:</b> Immersive art installation meets TED-caliber intellectual experience meets high-production '
        'LA bling. Think Meow Wolf meets Accenture Innovation Lab meets a skydiving drop zone that someone made '
        'impossibly cool.',
        styles['body']))
    story.append(Spacer(1, 8))

    # Guest Journey
    section_header(story, styles, 'GUEST JOURNEY')
    story.append(Spacer(1, 6))
    journey_data = [[
        Paragraph('ARRIVAL\nFreefall Entry\n(atmospheric)', ParagraphStyle('jc', fontName='Helvetica-Bold',
            fontSize=9, textColor=white, alignment=TA_CENTER, leading=12)),
        Paragraph('→', ParagraphStyle('arrow', fontName='Helvetica-Bold', fontSize=18,
            textColor=SLATE, alignment=TA_CENTER)),
        Paragraph('THE EXPERIENCE\nSix Activation Zones\n(book pillars)', ParagraphStyle('jc', fontName='Helvetica-Bold',
            fontSize=9, textColor=white, alignment=TA_CENTER, leading=12)),
        Paragraph('→', ParagraphStyle('arrow', fontName='Helvetica-Bold', fontSize=18,
            textColor=SLATE, alignment=TA_CENTER)),
        Paragraph('DEPARTURE\nThe Landing\n(keepsake + community)', ParagraphStyle('jc', fontName='Helvetica-Bold',
            fontSize=9, textColor=white, alignment=TA_CENTER, leading=12)),
    ]]
    jt = Table(journey_data, colWidths=[2.2*inch, 0.5*inch, 2.5*inch, 0.5*inch, 2.2*inch])
    jt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), NAVY),
        ('BACKGROUND', (2,0), (2,0), SLATE),
        ('BACKGROUND', (4,0), (4,0), NAVY),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(jt)
    story.append(Spacer(1, 10))

    # Zones
    section_header(story, styles, 'THE SIX ACTIVATION ZONES')
    story.append(Spacer(1, 8))

    zone_card(story, styles, '0', 'THE FREEFALL ENTRY', 'Altimeter Lock begins at the door',
        [
            '20-foot immersive entry corridor with floor-to-ceiling projection of sky rushing upward',
            'Spatial audio: wind, distant aircraft hum, then silence',
            'Wall text in oversized Sofia Sans Bold: "At 180 mph, the instinct is to fixate. What you focus on next changes everything."',
            'The tunnel opens to the full event space — deliberately overwhelming. Too much to see at once. That\'s the point.',
        ],
        'Christie laser projectors (180°), d&b audiotechnik spatial audio, custom wind soundscape')

    zone_card(story, styles, '1', 'THE ALTIMETER LOCK CHAMBER', 'Feel what tunnel vision actually costs',
        [
            '8-foot 3D altimeter prop at room center — backlit in Navy, analog face with sweeping hand',
            'STATE A (Locked): Dynamic lighting narrows until only the altimeter glows. Teammate voices go silent. The metric pulses alone.',
            'STATE B (The Scan): A projected hand — the Instructor\'s Gesture — points outward. Lights expand, voices return, the full picture floods back.',
            'Takeaway: custom-stamped coin with the Scan Routine on one side, altimeter graphic on the other.',
        ],
        'Circular LED wall (270°), theatrical lighting rig, spatial audio, custom 3D altimeter prop fabrication')

    zone_card(story, styles, '2', 'THE TEAM IN FREEFALL', 'You cannot see the formation from inside the fixation',
        [
            'THE PARACHUTE MURAL: 20–25 ft floor-to-ceiling mural of skydivers in formation — diverse, cinematic, human. Navy + Slate palette. One slot left open — the guest\'s slot.',
            'THE FREEFALL PHOTO BOOTH: AR overlay places guests inside the formation. Print-on-demand 4x6 branded with "You are not falling alone." Digital sent to phone, shareable.',
            'THE INTERDEPENDENCE NET: Guests write "one thing they need others to see" on tags. Tags join a growing net suspended from the ceiling. By end of night, the net is full.',
        ],
        'Large-format mural print or hand-painted, AR photo station, live print kiosk, suspended installation net')

    zone_card(story, styles, '3', 'THE BRICOLAGE LAB', 'Leadership is building with what you have',
        [
            'Tables stocked with raw materials: rope, carabiners, fabric, maps, compasses, chalk',
            'Rotating prompt on the wall (every 30 min): "With what\'s on this table, solve ___."',
            'JSB facilitator floats the room, drawing out insights without directing outcomes',
            'Outputs photographed and projected live on a feed in the main space',
        ])

    zone_card(story, styles, '4', 'THE SCAN ROUTINE LOUNGE', 'The practice, not the theory',
        [
            'Deep seating, low lighting, Slate Blue and Cream — the most intimate zone',
            'Five oversized cards per table: Altimeter / Rip Cord / Sky / Team / Landmarks, each with conversation prompts',
            'THE RITUAL: Every 45 minutes, a soft chime. All zones pause 60 seconds. JSB\'s voice guides the room through one Scan cycle. Then the noise resumes.',
        ])

    zone_card(story, styles, '5', 'THE GESTURE WALL', 'The leadership act that changes everything',
        [
            'Floor-to-ceiling Navy backlit panel with prompt: "What fixation have you been letting slide? What\'s the gesture you need to make?"',
            'Guests write anonymously on cards and pin them to the wall — a collective landscape of honest leadership reflection',
            'Video loop: JSB delivering the Instructor\'s Gesture keynote story — visceral, real, 4 minutes',
        ])

    story.append(PageBreak())

    # Bling Factor
    section_header(story, styles, 'THE BLING FACTOR — PREMIUM PRODUCTION TOUCHES')
    story.append(Spacer(1, 6))
    bling_table(story, styles, [
        ('Custom Cocktail Menu', '"The Altimeter" (navy-blue gin cocktail) · "Terminal Velocity" (espresso martini) · "The Scan" (non-alcoholic botanical) · "The Complete Picture" (champagne)'),
        ('Scent Design', 'Entry zone: cold air, altitude (crisp, minimal). Scan Lounge: cedar, warmth, grounded. Each zone has a distinct scent signature.'),
        ('Arrival Wristband', 'Custom leather wristband stamped with each guest\'s scan position for the evening: Altimeter / Sky / Team / Landmark — their role in the formation.'),
        ('Live Score', 'Live musician or curated ambient score that shifts as the evening evolves — not background music, but a designed soundscape.'),
        ('Projection Mapping', 'Key surfaces (ceiling, floors, mural wall) receive dynamic projection shifting between book concepts throughout the night.'),
        ('Exit Moment', 'Guests exit through a second tunnel lined with photographs from the night — their own faces already printed and installed in real time.'),
    ])

    # The Landing
    section_header(story, styles, 'THE LANDING — DEPARTURE EXPERIENCE')
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        'As guests leave, they receive a <b>branded keepsake kit</b> in a matte Navy envelope:',
        styles['body']))
    for item in [
        'The stamped coin (from Zone 1)',
        'A printed Scan Routine on Cream card stock',
        'QR code linking to a private post-event resource (MATTERING early access chapter or assessment)',
        'A handwritten note from JSB',
    ]:
        story.append(Paragraph(f'• {item}', styles['bullet']))
    story.append(Spacer(1, 6))

    # Exit quote
    quote_data = [[Paragraph(
        '"You came in fixated. You leave with the complete picture.<br/>'
        'That is Human Mode, Always.<br/>'
        'Now go interrupt some tunnel vision."',
        styles['quote'])]]
    qt = Table(quote_data, colWidths=[7.3*inch])
    qt.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CREAM),
        ('BOX', (0,0), (-1,-1), 2, NAVY),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('LEFTPADDING', (0,0), (-1,-1), 20),
        ('RIGHTPADDING', (0,0), (-1,-1), 20),
    ]))
    story.append(qt)
    story.append(Spacer(1, 10))

    # Brand integration summary
    section_header(story, styles, 'BRAND INTEGRATION — BOOK PILLARS TO ACTIVATIONS')
    story.append(Spacer(1, 6))
    summary_table(story, styles, [
        ('Altimeter Lock', 'Zone 1 — The Altimeter Lock Chamber (3D installation + dual-state experience)'),
        ('The Instructor\'s Gesture', 'Zone 5 — The Gesture Wall + JSB keynote video loop'),
        ('The Team in Freefall', 'Zone 2 — Parachute Mural + Photo Booth + Interdependence Net'),
        ('The Landscape Below', 'Zone 0 — Freefall Entry (environmental scanning begins at arrival)'),
        ('The Scan Routine', 'Zone 4 — Scan Routine Lounge + 45-minute pause ritual'),
        ('Bricolage', 'Zone 3 — The Bricolage Lab'),
        ('Human Mode, Always', 'The full arc — every zone, the keepsake kit, the exit moment'),
    ])

    # Guest Outcomes
    section_header(story, styles, 'GUEST OUTCOMES')
    story.append(Spacer(1, 6))
    outcomes = [
        ('<b>A felt memory</b> — not just information. The freefall tunnel, the coin in their pocket, the pause ritual.', ),
        ('<b>A name for something they already knew</b> — Altimeter Lock, Bricolage, the Scan Routine.',),
        ('<b>A social artifact</b> — the photo in the formation, shareable and branded.',),
        ('<b>A next step</b> — the keepsake kit with a clear entry into the MATTERING ecosystem.',),
        ('<b>A community signal</b> — they are part of a formation now. They are not falling alone.',),
    ]
    for (item,) in outcomes:
        story.append(Paragraph(f'• {item}', styles['bullet']))
    story.append(Spacer(1, 10))

    # Open Questions
    section_header(story, styles, 'OPEN QUESTIONS FOR PLANNING')
    story.append(Spacer(1, 6))
    questions_block(story, styles, [
        'Venue: warehouse conversion, rooftop, gallery space? (Recommend: Arts District LA or Culver City creative space)',
        'Capacity: 150 / 300 / 500 guests?',
        'JSB presence: keynote moment embedded in the evening, or purely experiential?',
        'Ticket model: ticketed public, invite-only, sponsor-hosted, or hybrid?',
        'AV/production vendor: need LA-based immersive experience production partner',
        'Bricolage Lab facilitation: JSB team or trained hosts?',
        'MATTERING book timing: is March pre-launch or launch week?',
    ])

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(f'PDF generated: {output_path}')

if __name__ == '__main__':
    build_pdf('/home/user/jsb-humanmode/human-mode-experience-LA-concept.pdf')
