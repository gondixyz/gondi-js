- maxTrancheFloor is a new required field in makeCollectionOffer and makeSingleNftOffer offer param
- renegotiation must have one of trancheIndex and targetPrincipal in make refinance offer. if renegotiation is for v3 loan, then it's trancheIndex. If not, must be targetPrincipal.
- emitLoan arguments have been updated.