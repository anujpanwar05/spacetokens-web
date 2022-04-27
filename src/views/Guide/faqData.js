
const faq = (policy) => {
  return {
    title: "FAQ",
    rows: [
        {
            title: "What is an NFT?",
            content: 'A Non Fungible Token or "NFT" is a unique piece of data that is stored on a blockchain. It is used to represent different digital items like photos, videos, audio or other types of files.',
        },
        {
          title: "How many planet types are there?",
          content: `There are over 20 known planets types, with more undiscovered planet types to be found. New planetary types will be added to the first generation galaxy for as long as there are planets left.`,
        },
        {
          title: "What is your token policy?",
          content: <p>Here is our token policy: {policy} Make sure to verify your Space Token by checking whether the policy id matches this.</p>
        },
        {
            title: "Does Cardano have smart contracts?",
            content: "Cardano will be launching smart contracts with the Alonzo release coming sometime in 2021. Native tokens are a feature that are already supported which is how this version of NFT's works."
        },
        {
          title: "How can I see my NFT's?",
          content: "You can view your discoveries on www.SpaceTokens.io but also within your Cardano wallet as a native token. The metadata that defines your NFT is also visible from Cardano exploeres, which you can get to by clicking the transaction address from the expeditions page."
        },
        {
            title: "Can I trade my Space Tokens?",
            content: 'After Cardano smart contracts go live with the Alonzo release, we will be working on building a trading interface on www.spacetokens.io which will allow you to put Space Tokens up for auction or sale. In the mean time you can send the native tokens to someone else using your own wallet if you are willing to handle the OTC trade.',
        }
    ],
  }
}

export default faq
