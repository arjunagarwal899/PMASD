maxlengths = {
	"person": {
		"title": 5,
		"name": 100,
		"gender": 1,
		"mobile": 11,
		"email": 100,
		"address": {
			"building_details": 50,
			"lane": 50,
			"area": 50,
			"city": 50,
			"pincode": 6
		},
		"qualification": 50,
		"designation": 50,
		"patient": {
			"patient_id": 6,
			"history": {
				"history": 100,
				"duration": 100,
				"description": 500
			}
		}
	},
	"hospital": 100,
	"consultation": {
		"professional_service": 100,
		"examination": {
			"examination_heading": 50,
			"examination": 50,
			"basic_info": 50,
			"reading": 50,
			"reading_units": 10,
			"description": 150
		},
		"diagnosis": {
			"diagnosis": 100,
			"as_of": 100,
			"description": 500
		},
		"general_advice": {
			"advice": 50,
			"description": 150
		},
		"follow_up": 50,
		"remarks": 300
	},
	"investigation": {
		"group_name": 50,
		"investigation": 50,
		"result": 50,
		"when_to_do": 50,
		"where_to_do": 50
	},
	"medication": {
		"formulation": 5,
		"brand_name": 100,
		"generic_name": 500,
		"strength": 50,
		"route": 50,
		"dosage": 20,
		"meal_relation": 50,
		"duration": 100,
		"company_name": 100,
		"company_division": 100,
		"remarks": 150
	}
}
