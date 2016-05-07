import {Injectable} from 'angular2/core';
import { Shortcut } from '../models/shortcut';

@Injectable()
export class ShortcutService {
  
  shortcut = new Shortcut();
  shortcuts: { [id: string]: Function; } = {};
  
  /*
  fromString(s: string){
    let keys = s.split('.');
    var shortcut = new Shortcut();
    keys.forEach(key => {
      switch (key) {
        case 'ctrl':
          shortcut.ctrl = true;
          break;
        case 'alt':
          shortcut.alt = true;
          break;
        case 'cmd':
          shortcut.ctrl = true;
          break;
        default:
          shortcut.key = key.charCodeAt(0);
          break;
      }
    })
    return shortcut;
  }
  */
    
  register(shortcut: string, callback: Function){
    this.shortcuts[shortcut.toLowerCase()] = callback;
  }
  
  public execute($event){
    let cbk = this.shortcuts[this.shortcut.name().toLowerCase()];
    this.shortcut.reset();
    if (cbk){ 
      cbk();
      $event.preventDefault();
    }
  }
  
  public keydown($event){
    switch ($event.which) {
      case 17: // ctrl
        this.shortcut.ctrl = true;
        break;
      case 18: // alt
        this.shortcut.alt = true;
        break;
      case 91: // cmd
        this.shortcut.cmd = true;
        break;
      default:
        this.shortcut.key = $event.which;
        this.execute($event);
        break;
    }
  }
  
  public keyup($event){
    switch ($event.which) {
      case 17: // ctrl
        this.shortcut.ctrl = false;
        break;
      case 18: // alt
        this.shortcut.alt = false;
        break;
      case 91: // cmd
        this.shortcut.cmd = false;
        break;
      default:
        this.shortcut.reset();
        break;
    }
  }
}