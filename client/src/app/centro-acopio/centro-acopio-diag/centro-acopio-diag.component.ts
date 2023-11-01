import { Component, Inject,OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/share/generic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-centro-acopio-diag',
  templateUrl: './centro-acopio-diag.component.html',
  styleUrls: ['./centro-acopio-diag.component.css']
})
export class CentroAcopioDiagComponent implements OnInit{
  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();

  apertura: Date;
  cierre: Date;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<CentroAcopioDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerCentroAcopio(this.datosDialog.id);
    }
  }
  obtenerCentroAcopio(id:any){
    this.gService
    .get('centroacopio',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data;
    });
   
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  } 
}
