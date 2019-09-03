import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabOne',
  templateUrl: './breastCancer.component.html',
  styleUrls: ['./breastCancer.component.scss']
})

export class BreastCancerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	/*var require: any;
  	var data = require('../../assets/treatmentTable.json');
	console.log("Json data : ", JSON.stringify(data));*/
  }
  /*displayedColumns: string[] = ['Chemotherapy', 'Targeted therapy'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  export interface PeriodicElement {
	  name: string;
	}

	const ELEMENT_DATA: PeriodicElement[] = [{
		"Chemotherapy" : 
			[ 	Capecitabine (Xeloda),
				Carboplatin (Paraplatin), 
				Cisplatin (Platinol), 
				Cyclophosphamide (Clafen / Cytoxan / Neosar), 
				Docetaxel (Taxotere),
				Doxorubicin (Adriamycin), 
				Doxorubicin Liposomal (Doxil / Evacet / LipoDox), 
				Epirubicin (Ellence),   
				Eribulin Mesylate (Halaven),
				Fluorouracil (Adrucil / 5-FU / Efudex / Fluoroplex), 
				Gemcitabine (Gemzar), 
				Irinotecan (Camptosar / CPT-11), 
				Ixabepilone (Ixempra), 
				Methotrexate (Rheumatrex / Trexall), 
				Mitomycin (Mutamycin), 
				Mitoxantrone (Novatrone / Onkotrone), 
				Oxaliplatin (Eloxatin), 
				Paclitaxel (Paxene / Taxol),
				Paclitaxel Albumin Bound (Abraxane),
				Vinorelbine (Navelbine)
			],
		"Targeted therapy" : 
			[	Abemaciclib (Verzenio),
				Alpelisib (Piqray),
				Bevacizumab (Avastin),
				Denosumab (Xgeva),
				Everolimus (Afinitor),
				Lapatinib (Tykerb),
				Niraparib (Zejula),
				Olaparib (Lynparza),
				Palbociclib (Ibrance),
				Pertuzumab (Perjeta),
				Ribociclib (Kisqali),
				Rucaparib (Rubraca),
				Trastuzumab (Herceptin),
				Trastuzumab emtansine (Kadcyla),
				Veliparib (ABT-888),
				Zoledronic acid (Zometa)
			]
		}
	];*/
}