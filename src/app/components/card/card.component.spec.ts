import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { AuthService } from './../../services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpService } from 'src/app/services/http.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { note } from 'src/app/models/note.model';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CardComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

fdescribe('changes the state of the note if it is 0 to 1 and if it is 1 to 0', () => {
  let component: CardComponent;
  let authService: AuthService;
  let storageService: StorageService;
  let httpService: HttpService;
  let httpClient: HttpClient;
  beforeEach(() => {
    httpService = new HttpService(httpClient);
    authService = new AuthService(httpService);
    storageService = new StorageService();
    component = new CardComponent(authService, storageService);
  });

  it('should return a 1 because the state of note is 0', () => {
    expect(component.noteStateSwitch('0')).toEqual('1');
  });
 
  it('should return a 0 because the state of note is 1', () => {
    expect(component.noteStateSwitch('1')).toEqual('0');
  });
});


fdescribe('changes the state of the button if If the list is empty, the state of the button is false', () => {
  let component: CardComponent;
  let authService: AuthService;
  let storageService: StorageService;
  let httpService: HttpService;
  let httpClient: HttpClient;
  beforeEach(() => {
    httpService = new HttpService(httpClient);
    authService = new AuthService(httpService);
    storageService = new StorageService();
    component = new CardComponent(authService, storageService);
  });

  it('should return true because the length of note is > 0', () => {
    let notes: note[] = [{ title: 'one', status: '0'}];
    expect(component.buttonStateSwitch(notes)).toEqual(true);
  });
 
  it('should return false because the length of note is 0', () => {
    let notes: note[] = [];
    expect(component.buttonStateSwitch(notes)).toEqual(false);
  });
});