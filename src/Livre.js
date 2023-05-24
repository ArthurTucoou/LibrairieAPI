// un livre
export default class Livre {
  constructor(id, titre, qtestock, prix) {
    this._id = id;
    this._titre = titre;
    this._qtestock = qtestock;
    this._prix = prix;
  }
  get titre() {
    return this._titre;
  }
  get id() {
    return this._id;
  }
  get qtestock() {
    return this._qtestock;
  }
  get prix() {
    return this._prix;
  }

  // modifier le titre
  set titre(titre) {
    this._titre = titre;
  }
  // modifier la quantité
  set qtestock(qtestock) {
    this._qtestock = qtestock;
  }
  pourAfficher() {
    return `--> ${this._texte} (${this._fait ? "fait" : "à faire"})`;
  }
}
