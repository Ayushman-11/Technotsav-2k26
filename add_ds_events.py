import json
import os

filepath = os.path.join("src", "data", "events.json")

with open(filepath, "r", encoding="utf-8") as f:
    data = json.load(f)

ds_events = [
    {
        "event_id": "DS-01",
        "event_name": "AI-GameCraft",
        "description": "Design and develop interactive games using AI-assisted development within deadline.",
        "type": "competition",
        "schedule": {
            "day": "Day 1",
            "date": "2026-04-15",
            "start_time": "09:00",
            "end_time": "16:00"
        },
        "venue": "First Floor Labs",
        "participation": {
            "eligibility": "All students from any Department",
            "mode": ["team"],
            "team_size": { "min": 2, "max": 3 }
        },
        "fees": { "team": 200 },
        "registration": {
            "link": "http://bit.ly/4uX6IJM",
            "qr": None
        },
        "prizes": [
            { "position": "1st", "amount": 3000 },
            { "position": "2nd", "amount": 2000 },
            { "position": "3rd", "amount": 1000 }
        ],
        "rounds": [
            {
                "name": "Rapid Quiz (Elimination Round)",
                "subtitle": "Round 1",
                "description": "AI and technology-based MCQs, game development basics, logical reasoning.",
                "steps": ["Duration: 20–30 minutes", "Top teams qualify for the development round"]
            },
            {
                "name": "Game Development",
                "subtitle": "Round 2",
                "description": "Teams must develop a playable game based on the given problem statement.",
                "steps": ["Duration: 3 Hours", "Focus on gameplay mechanics, UX, creativity"]
            },
            {
                "name": "Testing & Judging",
                "subtitle": "Round 3",
                "description": "Judges test the games and teams explain their approach.",
                "steps": ["Present game concept", "Explain design decisions and AI usage approach"]
            }
        ],
        "contact": [
            { "name": "Mrs. S. M. Ingawale", "phone": "9921958323" },
            { "name": "Irfan Naikwade", "phone": "8855909848" }
        ],
        "benefits": ["Certificates", "Refreshments"],
        "details": {
            "primary_overview": "The GameCraft – AI Game Development Challenge provides a platform for students to design and develop creative, interactive, and user-friendly games using controlled AI tools.",
            "what_is": "The competition blends game development, AI integration, and UX design, allowing participants to showcase their technical and creative abilities.",
            "who_can_participate": ["Open to all Students of any Department or Year", "Team participation only"],
            "event_timeline": [
                "Date: 15th April 2026",
                "Time: 9:00 AM to 4:00 PM (approx)",
                "Registration Fee: ₹200 per team"
            ],
            "rules_and_regulations": [
                {
                    "title": "Development Rules",
                    "points": [
                        "The competition duration is strictly 5 hours.",
                        "Problem statement/theme given at the start.",
                        "Use of any programming language or framework (HTML, CSS, JavaScript, etc.) is allowed."
                    ]
                },
                {
                    "title": "AI Usage Rules",
                    "points": [
                        "Only AI tools provided by the organizers are allowed.",
                        "Use of external AI tools is strictly prohibited.",
                        "Participants must demonstrate understanding of AI-generated outputs."
                    ]
                }
            ],
            "team_structure": "Minimum 2 and Maximum 3 members per team.",
            "additional_information": [
                "Participants must carry their own laptops and necessary accessories"
            ]
        }
    },
    {
        "event_id": "DS-02",
        "event_name": "BI DashBattle",
        "description": "A fast-paced data analytics competition where participants design and develop interactive dashboards.",
        "type": "competition",
        "schedule": {
            "day": "Day 1",
            "date": "2026-04-15",
            "start_time": "09:00",
            "end_time": "16:00"
        },
        "venue": "Data Science Labs",
        "participation": {
            "eligibility": "All students from any Department",
            "mode": ["individual", "team"],
            "team_size": { "min": 1, "max": 2 }
        },
        "fees": { "individual": 100, "team": 200 },
        "registration": {
            "link": "https://bit.ly/4195xcM",
            "qr": None
        },
        "prizes": [
            { "position": "1st", "amount": 3000 },
            { "position": "2nd", "amount": 2000 },
            { "position": "3rd", "amount": 1000 }
        ],
        "rounds": [
            {
                "name": "Dashboard Development & Presentation",
                "subtitle": "Round 1",
                "description": "Develop and present an interactive dashboard based on a given dataset.",
                "steps": [
                    "Data Cleaning & Preparation (1 Hour)",
                    "Dashboard Development (2 Hours)",
                    "Presentation (5 Min), Demonstration (3 Min), Q&A (5 Min)"
                ]
            }
        ],
        "contact": [
            { "name": "Mrs. S. A. Dhamankar", "phone": "9130585001" },
            { "name": "Namrata Belvekar", "phone": "9604522015" }
        ],
        "benefits": ["Certificates", "Refreshment"],
        "details": {
            "primary_overview": "BI DashBattle is a fast-paced data analytics competition where participants design interactive dashboards based on a given dataset or business problem statement.",
            "what_is": "A competition to showcase analytical thinking, visualization skills, and problem-solving abilities using tools like Power BI or Tableau.",
            "who_can_participate": ["Open to all Students of any Department or Year"],
            "event_timeline": [
                "Date: 15th April 2026",
                "Time: 9:00 AM to 4:00 PM (approx)",
                "Registration Fee: ₹100 per participant"
            ],
            "rules_and_regulations": [
                {
                    "title": "Development Rules",
                    "points": [
                        "Time Limit: 2 Hours.",
                        "Teams must report to the venue at least 30 minutes before the start.",
                        "Use of personal laptops, mobile phones, internet, or pen drives is strictly prohibited.",
                        "Participants must use only the systems provided in the computer lab."
                    ]
                }
            ],
            "team_structure": "Individuals or teams (maximum 2 member per team).",
            "additional_information": [
                "For any queries, reach out to Namrata Belvekar."
            ]
        }
    },
    {
        "event_id": "DS-03",
        "event_name": "E-sports",
        "description": "Competitive Battlegrounds Mobile India tournament in battle royale mode.",
        "type": "competition",
        "schedule": {
            "day": "Day 2",
            "date": "2026-04-16",
            "start_time": "09:00",
            "end_time": "16:00"
        },
        "venue": "Class Room No- 203 old building",
        "participation": {
            "eligibility": "All students from any Department",
            "mode": ["team"],
            "team_size": { "min": 4, "max": 4 }
        },
        "fees": { "team": 400 },
        "registration": {
            "link": "https://forms.gle/mcy3112FL5T7Q6uS7",
            "qr": None
        },
        "prizes": [
            { "position": "1st", "amount": 3000 },
            { "position": "2nd", "amount": 2000 }
        ],
        "rounds": [
            {
                "name": "Battle Royale Match",
                "subtitle": "Round 1",
                "description": "Teams fight in battle royale matches.",
                "steps": ["Join matches on time", "Scoring based on kills and final ranking"]
            }
        ],
        "contact": [
            { "name": "Mrs. J. K. Mane", "phone": "7387274784" },
            { "name": "Raj Khurd", "phone": "9322533976" }
        ],
        "benefits": [],
        "details": {
            "primary_overview": "The E-sports is a 4-hour fast-paced competition where participants compete in Battlegrounds Mobile India tournaments for prize money.",
            "what_is": "A squad-based mobile gaming tournament.",
            "who_can_participate": ["All students from any Department"],
            "event_timeline": [
                "Date: 16th April 2026",
                "Time: 9:00 AM to 4:00 PM (approx)",
                "Registration Fee: ₹400 per team"
            ],
            "rules_and_regulations": [
                {
                    "title": "Rules",
                    "points": [
                        "Each team has 4 players (squad).",
                        "Matches are played in battle royale mode.",
                        "Points based on Kills + Final position (ranking).",
                        "Fair Play: No hacking or cheating, no external tools.",
                        "Communication: Only team members allowed.",
                        "No abusive language or toxic behavior."
                    ]
                }
            ],
            "team_structure": "4 players per team (Squad)",
            "additional_information": []
        }
    }
]

# Update or insert DS department
cleaned_depts = []
ds_dept = None
for d in data["departments"]:
    if d["department_name"] == "CSE (Data Science)":
        if ds_dept is None:
            ds_dept = d
            cleaned_depts.append(d)
    else:
        cleaned_depts.append(d)

if ds_dept:
    ds_dept["events"] = ds_events
else:
    cleaned_depts.append({
        "department_name": "CSE (Data Science)",
        "events": ds_events
    })

data["departments"] = cleaned_depts

with open(filepath, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4)
