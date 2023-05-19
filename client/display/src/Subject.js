class Subject {
  constructor(){
   this.observers = [];
  }
  subscribe(observer){
   this.observers.push(observer);
  }
  unsubscribe(observer){
   this.observers = this.observers.filter((o) => o != observer);
  }
  unsubscribeAll(){
   this.observers = [];
  }
  notifySubscribers(src, ...other){
   for (const observer of this.observers){
    observer.update(src, ...other);
   }
  }
}

class Observer {
 update(source, ...other){}
}

export { Subject };