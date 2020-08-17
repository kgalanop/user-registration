import { Component, DebugElement } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';

import { ShowHidePasswordDirective } from 'src/app/shared/directives';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div>
      <input [type]="type" value="value" appShowHidePassword>
    </div>`,
})
export class TestComponent {
  type = 'password';
}

describe('ShowHidePasswordDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowHidePasswordDirective,
        TestComponent
      ]
    });
  }));

  beforeEach(() => {

  });

  it('should show eye button for password input types', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const eyeButton = fixture.debugElement.query(By.css('.input-group-text'));
    expect(eyeButton).toBeTruthy();
  });

  it('should not show eye button for non-password input types', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    component.type = 'text';
    fixture.detectChanges();
    const eyeButton = fixture.debugElement.query(By.css('.input-group-text'));
    expect(eyeButton).toBeFalsy();
  });

  it('should show value when clicking on eye button', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const eyeButton = fixture.debugElement.nativeElement.querySelector('.input-group-text');
    eyeButton.click();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toEqual('text');
  });

  it('should hide value when clicking again', () => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const eyeButton = fixture.debugElement.nativeElement.querySelector('.input-group-text');
    eyeButton.click();
    eyeButton.click();
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.getAttribute('type')).toEqual('password');
  });

});
