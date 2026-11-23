
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def index():
    return render_template(
        "index.html",
        page_title="Mobile Mechanic in Cookeville, TN | Patriot Mobile Auto Repair",
        meta_description=(
            "Patriot Mobile Auto Repair is a veteran-owned mobile "
            "mechanic serving Cookeville, Algood, and surrounding "
            "Tennessee communities. Convenient automotive service "
            "brought to your location."
        )
    )


@app.route("/services")
def services():
    services_list = [
        {
            "name": "Vehicle Diagnostics",
            "description": (
                "Professional diagnostic testing to help "
                "identify the cause of vehicle problems."
            ),
            "symbol": "01",
            "features": [
                "Check engine light diagnostics",
                "Electrical system troubleshooting",
                "Vehicle performance concerns"
            ]
        },
        {
            "name": "Brake Services",
            "description": (
                "Brake inspections, maintenance, and repairs "
                "to help keep your vehicle safe."
            ),
            "symbol": "02",
            "features": [
                "Brake system inspections",
                "Brake pad and rotor service",
                "Brake performance concerns"
            ]
        },
        {
            "name": "Battery Services",
            "description": (
                "Battery testing and replacement to help "
                "keep your vehicle starting reliably."
            ),
            "symbol": "03",
            "features": [
                "Battery testing",
                "Battery replacement",
                "Starting system checks"
            ]
        },
        {
            "name": "Preventive Maintenance",
            "description": (
                "Routine automotive maintenance to help "
                "keep your vehicle running reliably."
            ),
            "symbol": "04",
            "features": [
                "Routine vehicle inspections",
                "Fluid and maintenance checks",
                "Preventive care recommendations"
            ]
        }
    ]

    return render_template(
        "services.html",
        page_title="Mobile Auto Repair Services in Cookeville, TN | Patriot",
        meta_description=(
            "Explore mobile automotive repair services from "
            "Patriot Mobile Auto Repair in Cookeville, TN. "
            "Convenient vehicle care brought to your location."
        ),
        services_list=services_list
    )



@app.route("/contact")
def contact():
    service_options = [
        # Repairs
        "Brake Services",
        "Starting / Charging",
        "Cooling / Air Conditioning",

        # Diagnostics
        "Engine Diagnostics",
        "Electrical Diagnostics",
        "Check Engine Light",

        # Maintenance
        "Oil and Fluid Services",
        "Pre-Purchase Inspection",

        # General services
        "Vehicle Diagnostics",
        "Battery Services",
        "Preventive Maintenance",
        "Other / Not Sure"
    ]

    selected_service = request.args.get("service", "")

    if selected_service not in service_options:
        selected_service = ""

    return render_template(
        "contact.html",
        page_title="Contact Patriot Mobile Auto Repair | Cookeville, TN",
        meta_description=(
            "Contact Patriot Mobile Auto Repair for "
            "mobile auto repair, diagnostics, and maintenance "
            "in Cookeville, Tennessee."
        ),
        service_options=service_options,
        selected_service=selected_service
    )



if __name__ == "__main__":
    app.run(debug=True, port=5001)
