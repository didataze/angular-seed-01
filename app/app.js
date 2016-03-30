angular.module('myApp', [])
    .controller('commandeListCTRL', function ($http) {

        var cmdList = this;
        var tva = 1.20;

        cmdList.article = [
            {ref: '01', lbl: 'voiture', prixuni: 101, quantite: 18},
            {ref: '02', lbl: 'moto', prixuni: 8, quantite: 18},
            {ref: '03', lbl: 'car', prixuni: 12, quantite: 7}
        ];

        cmdList.prixHT = function (article) {
            return article.prixuni * article.quantite;
        };

        cmdList.prixTTC = function (article) {
            return cmdList.prixHT(article) * tva;
        };

        cmdList.totalHT = function () {
            return cmdList.article.reduce(function (total, article) {
                return total + cmdList.prixHT(article);
            }, 0);
        };

        cmdList.totalTTC = function () {
            return cmdList.article.reduce(function (total, article) {
                return total + cmdList.prixTTC(article);
            }, 0);
        };

        cmdList.ajoutArticle = function () {
            cmdList.article.push({

                //     ref: cmdList.frmArticle.ref,
                //     lbl: cmdList.frmArticle.lbl,
                //     prixuni: cmdList.frmArticle.prixuni,
                //     quantite: cmdList.frmArticle.quantite

                ref: cmdList.frmArticle.selectedItem['ISBN-10'],
                lbl: cmdList.frmArticle.selectedItem.title,
                quantite: cmdList.frmArticle.quantite,
                prixuni: cmdList.frmArticle.selectedItem.price

            });

            cmdList.frmArticle = {};
        };

        cmdList.supprimerCmd = function (cmd) {
            console.log(cmdList.article.indexOf(cmd));
            cmdList.article.splice(cmdList.article.indexOf(cmd), 1);

        }


        var url = "https://api.mongolab.com/api/1/databases/books/collections/books/?apiKey=d3qvB8ldYFW2KSynHRediqLuBLP8JA8i"

        $http.get(url).then(function (response) {
            cmdList.catalog = response.data;

        })


        // $scope.$watch('cmdList.article',function(){},true);
    });
