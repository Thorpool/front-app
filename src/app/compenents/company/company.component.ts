import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: ICompany;
  displayedColumns: string[] = ['year', 'data', 'evolution'];
  lastYear: number;
  constructor(private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompany(id).subscribe((company: ICompany) => {
      this.company = company;
      this.lastYear = company.results[0].year;
    });
  }

  /**
   * Calcul l'évolution
   * @param column string
   */
  getEvolution(column: string): string {
    const lastyear = this.company.results[0][column];
    const firstYear = this.company.results[1][column];
    return ((( lastyear - firstYear ) / firstYear ) * 100).toFixed(2);
  }

}
