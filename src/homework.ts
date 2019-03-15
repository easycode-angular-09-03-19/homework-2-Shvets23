//1.Создать декоратор метода addItemInfoDecorator он должен добавлять поле date в возвращаемом объекте с датой когда был вызван метод а также поле info в котором будет записан текст состоящий из названия товара и его цены например: ‘Apple iPhone - $100’;
// Для того что бы функция была вызвана в правильном контексте внутри декоратора ее нужно вызывать через apply let origResult =  originalFunc.apply(this);



function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let originalFunc = descriptor.value;
    descriptor.value = function()  {
        let origResult =  originalFunc.apply(this);
        return {
            date: new Date(),
            info: `${this.name} - $${this.price}`
        }
    }
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

let item = new Item('Nokia', 500);

//2. Создать декоратор класса User. Он должен добавлять в данном классе поле createDate датой создания класса а также добавлять поле type в котором будет записана строка ‘admin’ или ‘user’ данную строку нужно передать в декоратор при вызове. Сам класс и имя декоратора может быть произвольным.

function userDecorator(type: string): any {
    return function(targetClass){
        return class {
            public type: string;
            public createDate: {} = new Date();
            constructor(type){
                this.type = type;
                console.log(this)
                this.createDate = new Date()
            }
        }
    }
}
@userDecorator('admin')
class User {
   
}

let user = new User()


//3.Есть два апи для получения и работы с новостями одно для получения новостей из USA второе из Ukraine. Под эти апи создано по два интерфейса и по два класса. Переделайте это в namespaces.
namespace apiUsa {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }
    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'
        public getNews() {} // method
    }
}


namespace apiUa {
    export interface INews2 {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
    export class NewsService2 {
        protected apiurl: string = 'https://news_api_2_url'
        public getNews() {} // method get all news
        public addToFavorite() {} // method add to favorites
    }
}

//4.Есть два класса Junior и Middle создайте класс Senior который будет имплементировать этих два класса а также у него будет еще свой метод createArchitecture реализация данного метода может быть произвольной.

class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}

class Middle {
    createApp() {
        console.log('Creating!!!');
    }
}

class Senior implements Junior, Middle{
    doTasks(): void {};
    createApp(): void {};
    createArchitecture(): void {
        console.log('Architecture!!!');
    }
}
applyMixin(Senior, [Junior, Middle]);
function applyMixin(targetClass, baseClasses) {
        baseClasses.forEach((baseClass) => {
            Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
                targetClass.prototype[propName] = baseClass.prototype[propName];
            });
        });
}
let senior = new Senior;
