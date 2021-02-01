export default ({ req, reqMask }) => {
  return {
    // ---------------------------
    getProductOffer_xsbj (data) {
      return reqMask('cp/cxxsbjBybh', data)
    },
    getProductOffer_xsbjkh (data) {
      return reqMask('cp/cxxsbjkh', data)
    },
    getProductOffer_cgbj (data) {
      return reqMask('cp/cxcgbjBybh', data)
    },
    getProductOffer_cgbjghs (data) {
      return reqMask('cp/cxcgbjghs', data)
    },
    getProductOffer_jgbj (data) {
      return reqMask('cp/cxjgbjBybh', data)
    },
    getProductOffer_jgbjjgs (data) {
      return reqMask('cp/cxjgbjjgs', data)
    },
    getProductOffer_wfxsbj (data) {
      return reqMask('cp/cxwfxsbjBybh', data)
    },
    getProductOffer_wfxsbjjgs (data) {
      return reqMask('cp/cxwfxsbjjgs', data)
    },
    // ----------------------------------------
    addProductOffer_xsbj (data) {
      return reqMask('cp/tjxsbj', data)
    },
    addProductOffer_cgbj (data) {
      return reqMask('cp/tjcgbj', data)
    },
    addProductOffer_jgbj (data) {
      return reqMask('cp/tjjgbj', data)
    },
    addProductOffer_wfxsbj (data) {
      return reqMask('cp/tjwfxsbj', data)
    },
    // --------------------------------------------
    updateProductOffer_xsbj (data) {
      return reqMask('cp/xgxsbj', data)
    },
    updateProductOffer_cgbj (data) {
      return reqMask('cp/xgcgbj', data)
    },
    updateProductOffer_jgbj (data) {
      return reqMask('cp/xgjgbj', data)
    },
    updateProductOffer_wfxsbj (data) {
      return reqMask('cp/xgwfxsbj', data)
    },
    // -----------------------------------------------------
    delProductOffer_xsbj (data) {
      return reqMask('cp/scxsbj', data)
    },
    delProductOffer_cgbj (data) {
      return reqMask('cp/sccgbj', data)
    },
    delProductOffer_jgbj (data) {
      return reqMask('cp/scjgbj', data)
    },
    delProductOffer_wfxsbj (data) {
      return reqMask('cp/scwfxsbj', data)
    },
    // ----------------------------------------------------
    getProductOffer_xsbj_kh (data) {
      return reqMask('cp/cxxsbjtjks', data)
    },
    getProductOffer_cgbj_kh (data) {
      return reqMask('cp/cxcgbjtjks', data)
    },
    getProductOffer_jgbj_kh (data) {
      return reqMask('cp/cxjgbjtjks', data)
    },
    getProductOffer_wfxsbj_kh (data) {
      return reqMask('cp/cxwfxsbjtjks', data)
    },
    // ----------
    updateOffer (data) {
      return reqMask('cp/xgbj', data)
    }
  }
}
