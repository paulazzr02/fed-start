// import { LayoutDefaultView } from "../views/LayoutView";
// import NavbarView from "../views/NavbarView";
// import { ClinicalFormView } from "../views/ClinicalView";
// // import "../views/ClinicalDetailView";
// import DietScoreView from "../views/DietScoreView";
// import { GalleryImageUploadView } from "../views/GalleryView";

// // import SearchModel from "../models/SearchModel.js";

// export default class MainController {
//   constructor() {
//     const appViewEl = document.getElementById("app");
//     const gnbViewEl = document.getElementsByClassName("global-navbar")[0];
//     const clinicalFormViewEl = document.getElementById("clinicalSearch");
//     // const clinicalResultViewEl = document.getElementById("clinicalResult");
//     const dietScoreViewEl = document.getElementById("dietScoreView");
//     const galleryImageUploadViewEl = document.getElementById(
//       "galleryImageUploadView"
//     );

//     if (gnbViewEl) new LayoutDefaultView(appViewEl);

//     if (gnbViewEl) new NavbarView(gnbViewEl);

//     if (dietScoreViewEl) new DietScoreView(dietScoreViewEl);

//     if (galleryImageUploadViewEl)
//       new GalleryImageUploadView(galleryImageUploadViewEl);

//     if (clinicalFormViewEl) {
//       this.clinicalFormView = new ClinicalFormView(clinicalFormViewEl);
//       // .on("@submit", e => this.search(e.detail.input))
//       // .on("@reset", () => this.renderView());

//       // this.clinicalResultView = new ClinicalResultView(clinicalResultViewEl);
//     }

//     this.renderView();
//   }

//   async search(query) {
//     // this.clinicalFormView.setValue(query);
//     // const data = await SearchModel.list(query);
//     // this.onSearchResult(data);
//   }

//   onSearchResult(data) {
//     // this.clinicalResultView.mount(data)
//   }

//   async renderView() {
//     // this.clinicalResultView.hide();
//   }
// }
