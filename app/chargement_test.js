

describe('commandeListCTRL', function () {
    var ctrl, $httpBackend;
    beforeEach(module('myApp'));
    beforeEach(inject(function(_$httpBackend_, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i').respond([
            {title: 'Test1',price: 11},{title: 'Test12',price: 12}]);
        ctrl = $controller('commandeListCTRL', {});
    }));
    it('Test : chargement du catalogue', function() {
        expect(ctrl.catalog).toBeUndefined();
        $httpBackend.flush();
        expect(ctrl.catalog).toEqual([{title: 'Test1',price: 11},{title: 'Test12',price: 12}]);
        expect(ctrl.catalog.length).toEqual(2);

    });

    it('Test : Ajout d’une ligne du bon de commande', function() {

        ctrl.article = [ { ref: '01', lbl: 'voiture', prixuni: 101, quantite: 18 },
            { ref: '02', lbl: 'moto', prixuni: 8, quantite: 18 },
            { ref: '03', lbl: 'car', prixuni: 12, quantite: 7 } ];

        ctrl.ajoutArticle = {
            selectedItem: {'ISBN-10': 'XXX', lbl: 'YYY', prixuni: 123,quantite: 5}
        };

        expect(ctrl.article.length).toEqual(3);

        expect(ctrl.article).toEqual(
            [ { ref: '01', lbl: 'voiture', prixuni: 101, quantite: 18 },
                { ref: '02', lbl: 'moto', prixuni: 8, quantite: 18 },
               { ref: '03', lbl: 'car', prixuni: 12, quantite: 7 } ]);
    });

    it('Test : Supprission d’une ligne du bon de commande', function() {

        ctrl.article = [ { title: 'YYY', price: 123},{title: 'Test12',price: 12},{title: 'Test1',price: 11}];

        ctrl.supprimerCmd(ctrl.article[1]);
        expect(ctrl.article.length).toEqual(2);
        expect(ctrl.article).toEqual(
            [ { title: 'YYY', price: 123},{title: 'Test1',price: 11}]

        );
    });


});
