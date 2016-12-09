/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GistContentComponent } from './gist-content.component';

describe('GistContentComponent', () => {
  let component: GistContentComponent;
  let fixture: ComponentFixture<GistContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GistContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GistContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
