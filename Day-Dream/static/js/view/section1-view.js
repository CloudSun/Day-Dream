var Section1View = function () {
    View.call(this, "Section1",ViewType.SECTION);
    this.prototype = new View();
    this.prototype.constructor = LoginView;
    var parent = this.prototype;
    parent.init.call(parent, parent.addEvents.call(parent));

    this.init = function () {
        //TODO
        

        CallbackL();
    };
    this.addEvents = function () {
        //TODO

        CallbackL();
    };

    this.show = function () {
        this.prototype.show.call(this);   //调用父类中的show()方法

        //TODO
    };

    this.hide = function () {
        this.prototype.hide.call(this);   //调用父类中的hide()方法

    };

    //func run
    this.init.call(this, this.addEvents.call(this));
}

var SectionMenu = {

}