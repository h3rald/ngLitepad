export class Shortcut {
  ctrl: boolean = false;
  alt: boolean = false;
  cmd: boolean = false;
  key: number;
  
  public isSet(){
    return (this.key) ? true : false;
  }
  
  private _stringFromCharCode(c: number){
    switch (c) {
      case 27:
        return "esc";
      default:
        return String.fromCharCode(c);
    } 
  }
  
  public name(){
    var keys = [];
    if (this.ctrl){
      keys.push("ctrl");
    }
    if (this.alt){
      keys.push("alt");
    }
    if (this.cmd){
      keys.push("cmd");
    }
    if (this.key){
      keys.push(this._stringFromCharCode(this.key));
    }
    return keys.join(".");
  }
  
  public reset(){
    this.ctrl = false;
    this.alt = false;
    this.cmd = false;
    this.key = null;
  }
}