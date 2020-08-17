import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: 'input[appShowHidePassword]'
})
export class ShowHidePasswordDirective implements OnInit {

  private shown = false;

  constructor(private el: ElementRef) { }

  ngOnInit(): any {
    const parent = this.el.nativeElement.parentNode;
    const type = this.el.nativeElement.getAttribute('type');
    if (type === 'password') {
      const div = document.createElement('div');
      div.className = 'input-group-append';
      const span = document.createElement('span');
      span.className = 'input-group-text';
      span.style.cursor = 'pointer';
      const i = document.createElement('i');
      i.className = 'fa fa-eye-slash';
      span.addEventListener('click', () => {
        this.toggle(span);
      });
      span.appendChild(i);
      div.appendChild(span);
      parent.appendChild(div);
    }
  }

  private toggle(span: HTMLElement) {
    this.shown = !this.shown;

    if (this.shown) {
      span.firstElementChild.className = 'fa fa-eye-slash';
      this.el.nativeElement.setAttribute('type', 'text');
    } else {
      span.firstElementChild.className = 'fa fa-eye';
      this.el.nativeElement.setAttribute('type', 'password');
    }
  }
}
