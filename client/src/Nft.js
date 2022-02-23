import React, { useState, useEffect } from "react";
import CryptoCoder from "./contracts/CryptoCoders.json";
import getWeb3 from "./getWeb3";

const Nft = () => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [coders, setCoders] = useState([]);
  const [mintText, setMintText] = useState("");

  const loadNFTS = async (contract) => {
    const totalSupply = await contract.methods.totalSupply().call();

    let nfts = [];
    for (let i = 0; i < totalSupply; i++) {
      let coder = await contract.methods.coders(i).call();
      nfts.push(coder);
    }
    setCoders(nfts);
  };

  const loadWeb3Account = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWebContract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const networkData = CryptoCoder.networks[networkId];
    if (networkData) {
      const abi = CryptoCoder.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      console.log(contract);
      return contract;
    }
  };

  // load WEB3 account from Metmask
  // load the contract
  // load all the NFTs

  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Account(web3);
    let contract = await loadWebContract(web3);
    await loadNFTS(contract);
  }, []);

  const mint = () => {
    console.log(mintText);
    contract.methods.mint(mintText).send({ from: account }, (error) => {
      console.log("worked");
      if (!error) {
        setCoders([...coders, mintText]);
        setMintText("");
      }
    });
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light px-4">
        <a className="navbar-brand" href="#">
          제20대 대통령선거
        </a>
        <span>{account}</span>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <img
              className="mb-4"
              src="https://avatars.dicebear.com/api/bottts/ssdrv.svg"
              alt=""
              width="72"
            />
            <h1 className="display-5 fw-bold">
              모두가 대한민국을 위해 투표하세요.
            </h1>
            <div className="col-6 text-center mb-3">
              <p className="lead text-center">
                2022.03.09.(수) 법정공휴일 오전 6시 ~ 오후 6시
                <br />
                (※ 코로나19확진·격리 유권자: 오후 6시 ~ 오후 7시 30분)
              </p>
              <div>
                <input
                  type="text"
                  value={mintText}
                  onChange={(e) => setMintText(e.target.value)}
                  className="form-control mb-2"
                  placeholder="후보자 이름을 입력바랍니다."
                />
                <button onClick={mint} className="btn btn-primary">
                  등록
                </button>
              </div>
            </div>
            <div className="col-8 d-flex justify-content-center flex-wrap">
              {coders.map((coder, key) => (
                <div
                  className="d-flex flex-column align-items-center"
                  key={key}
                >
                  <img
                    width="150"
                    src={`https://avatars.dicebear.com/api/pixel-art/${coder.replace(
                      "#",
                      ""
                    )}.svg`}
                  />
                  <span>{coder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nft;