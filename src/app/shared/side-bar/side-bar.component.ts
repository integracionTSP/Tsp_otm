import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
  name: string;
  route?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Orden de carga',
    children: [
      {
        name: 'Autorizacion',
        route: '/orden-carga'
      },
     
    ]
  },
   {
    name: 'Constancia Cumplido',
     route: '/constancia-cumplido'
   },
   {
    name: 'Operacion',


    children: [
      {
        
        name: 'Impresion',
        children: [
          {
            name: 'Cheque OTM',
            route: '/cheque-otm'
          }
        ]
      },
     
    ]
  },
  {
    name: 'Salir',
    route: '/login'
  }
];



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
  route?: string;
}

/**
 * @title Tree with flat nodes
 */

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})


export class SideBarComponent implements OnInit {
  ngOnInit() {
  }
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      route: node.route
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  eventHandler(node: FoodNode) {
    if (node.route == "/login") {
      localStorage.setItem('user', '{"username":"","password":"","email":""}');
      //localStorage.clear();
    
  
    }
  }

}
