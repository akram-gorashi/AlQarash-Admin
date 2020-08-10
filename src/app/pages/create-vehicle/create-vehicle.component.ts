import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { VehicleService } from 'app/services/vehicle/vehicle.service';
import { Vehicle } from 'app/models/vehicle';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
})
export class CreateVehicleComponent implements OnInit {
  @ViewChild('vehicleCreationForm', { static: false })
  vehicleCreationForm: ElementRef;

  vehicleCreationFormGroup: FormGroup;
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  isUploading;
  masterTableData: any;
  showSuccessAlert: boolean = false;
  showErrorMeassageAlert: boolean = false;
  errorMessage: any;
  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.initForm();
    this.getMasterTableData();
    this.initUploader();
  }
  getMasterTableData() {
    this.vehicleService.getMasterTableData().subscribe((masterTableData) => {
      this.masterTableData = masterTableData[0];
      console.log(this.masterTableData);
    });
  }

  initForm(): void {
    this.vehicleCreationFormGroup = new FormGroup({
      make: new FormControl(null, Validators.required),
      mileage: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
      condition: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      fuel: new FormControl(null, Validators.required),
      transmission: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      agentName: new FormControl(null, Validators.required),
      agentPhoneNumber: new FormControl(null, Validators.required),
      agentLocation: new FormControl(null, Validators.required),
      userId: new FormControl(2),
    });
  }

  initUploader(): void {
    this.uploader = new FileUploader({ url: '', autoUpload: false });
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  createVehicle(): void {
    console.log(this.vehicleCreationFormGroup);
    if (this.vehicleCreationFormGroup.invalid) {
      return;
    }
    const uploadItems: any[] = this.uploader.getNotUploadedItems(); // Uploader's uploaded items
    const formData = new FormData(this.vehicleCreationForm.nativeElement); // Holds the files and data
  //  this.vehicleCreationFormGroup.value.color = { id: 1, name: "White", nameAr: "أبيض" };
    uploadItems.forEach((item) => {
      formData.append('images', item._file);
    });

    formData.append(
      'make',
      this.vehicleCreationFormGroup.get('make').value
    );
    formData.append(
      'mileage',
      this.vehicleCreationFormGroup.get('mileage').value
    );
    formData.append(
      'color',
      this.vehicleCreationFormGroup.get('color').value
    );
    formData.append(
      'condition',
      this.vehicleCreationFormGroup.get('condition').value
    );
    formData.append(
      'model',
      this.vehicleCreationFormGroup.get('model').value
    );
    formData.append('year', this.vehicleCreationFormGroup.get('year').value);
    formData.append(
      'fuel',
      this.vehicleCreationFormGroup.get('fuel').value
    );
    formData.append(
      'transmission',
      this.vehicleCreationFormGroup.get('transmission').value
    );
    formData.append('price', this.vehicleCreationFormGroup.get('price').value);
    formData.append(
      'description',
      this.vehicleCreationFormGroup.get('description').value
    );
    formData.append(
      'agentName',
      this.vehicleCreationFormGroup.get('agentName').value
    );
    formData.append(
      'agentPhoneNumber',
      this.vehicleCreationFormGroup.get('agentPhoneNumber').value
    );
    formData.append(
      'agentLocation',
      this.vehicleCreationFormGroup.get('agentLocation').value
    );
    formData.append(
      'userId',
      this.vehicleCreationFormGroup.get('userId').value
    );
    console.log(formData);
    //  this.constructFormData(formData)
    this.isUploading = true;

    // Send the request to create the ticket
    this.vehicleService.createVehicle(formData).subscribe(
      (res) => {
        const createdVehicle: Vehicle = res.body;
        // Send the newly created Vehicle to the service to be viewed
        // this.VehicleService.addVehicleLists(createdVehicle);
        this.isUploading = false;
        // Navigate to Vehicles list
        // this.router.navigate(['/Vehicles']);
        // Show success message
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 10000);
      },
      (err) => {
        this.isUploading = false;
        this.showErrorMeassageAlert = true;
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.showErrorMeassageAlert = false;
        }, 10000);
        console.log('Your Vehicle has not been created:', err.error.message);
        console.log(err);
      }
    );
  }

  constructFormData(formData) {
      formData.color = this.masterTableData.color.filter(color => color.id == formData.color);
      console.log(formData.color)
  }
  resetForm(): void {
    this.vehicleCreationFormGroup.reset();
  }
}
