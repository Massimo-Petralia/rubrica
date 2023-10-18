import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rubric-page',
  templateUrl: './rubric-page.component.html',
  styleUrls: ['./rubric-page.component.scss'],
})
export class RubricPageComponent implements OnInit {
  constructor(private dataService: DataService) {}

  contacts: Contact[] = [];

  subs = new Subscription();

  ngOnInit(): void {
    this.subs.add(
      this.dataService.getData().subscribe((contacts) => {
        this.contacts = contacts;
      })
    );
  }

  onCreate(contact: Contact) {
    this.subs.add(
      this.dataService
        .createContact(contact)
        .subscribe((contact) => (this.contacts = [...this.contacts, contact]))
    );
  }

  onDelete(id: number | null) {
    this.subs.add(
      this.dataService.deleteContact(id).subscribe(() => {
        this.contacts = this.contacts.filter((contact) => 
          contact.id !== id
        );
      })
    );
  };

  onSave(contact: Contact){
    this.subs.add(
      this.dataService.updateContact(contact).subscribe()
    )
  }

}
