const EventEmitter = require('events')

const MyEmitter = class extends EventEmitter{

}

let queue = [];
let count = 0;
const QUEUE_MAX_LENGTH = 500;

const myEmitter = new MyEmitter();

let consumer = {
    consume(queue){
        setTimeout(function () {
            if(queue.length > 0){
                console.log(`消费------${queue.pop()}`);
                myEmitter.emit('produce');
            }else {
                myEmitter.emit('produce');
            }
        },500)
    }
};

let producer = {
    produce(queue){
        setTimeout(function () {
            if(queue.length <= QUEUE_MAX_LENGTH){
                let items = `产品${count++}`;
                queue.push(items);
                console.log(`生产------${items}`)
                myEmitter.emit('consume');
            }else{
                myEmitter.emit('consume');
            }
        },500)
    }
};
myEmitter.on('consume', () => {
    consumer.consume(queue);
});


myEmitter.on('produce', () => {
    producer.produce(queue);
});

setInterval(function () {
    producer.produce(queue);
},1000)