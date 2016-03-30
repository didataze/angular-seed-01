'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */


describe('my app', function () {

    var rows;
    var references;
    beforeEach(function () {
        browser.get('index.html');

        rows = element.all(by.repeater("cmd in cmdList.article"));
        references = element.all(by.repeater('cmd in cmdList.article').column("cmd.ref"));

    });


    it("should have 3 initial rows", function () {
        expect(rows.count()).toEqual(3);
        expect(references.last().getText()).toEqual('03');
    });


    it("supprimer une ligne ", function(){
        rows.last().element(by.buttonText("Supprimer")).click();
        expect(rows.count()).toEqual(2);
        expect(references.last().getText()).toEqual('02');
    });

    it(" Ajout d une ligne ", function(){

        var select = element(by.model("cmdList.frmArticle.selectedItem"));
        var option = select.element(by.cssContainingText('option',"Ninja"));
        option.click();
        var quantite = element(by.model("cmdList.frmArticle.quantite"));

        quantite.sendKeys("65").submit();

        expect(rows.count()).toEqual(4);
        expect(references.last().getText()).toEqual('193398869X');
        expect(rows.last().element(by.model("cmd.quantite")).getAttribute("value")).toEqual("65");


    });

});


