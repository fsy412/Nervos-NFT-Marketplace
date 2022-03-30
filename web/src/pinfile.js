const axios = require("axios");
const instance = axios.create({
    baseURL: "https://api.pinata.cloud",
});

const ApiKey = '0b8db5cac26fa6c7ecee'
const ApiSecret = '03881c5178613ab46c26a5a5157ccc999f09935e0e7e6eacb5705c65f48c618c'
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZTc0NTc4Ny1mMjllLTQzNWUtYjUxYS0zNzQ2N2JlNzliMDMiLCJlbWFpbCI6ImZzeTQxMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlfSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMGI4ZGI1Y2FjMjZmYTZjN2VjZWUiLCJzY29wZWRLZXlTZWNyZXQiOiIwMzg4MWM1MTc4NjEzYWI0NmMyNmE1YTUxNTdjY2M5OTlmMDk5MzVlMGU3ZTZlYWNiNTcwNWM2NWY0OGM2MThjIiwiaWF0IjoxNjQzMzMxNzc0fQ.3X88nUKeou-49btIQ_gZtJjixrd6rVQAQSuzvq-0l6E'

export const getHeader = () => {
    return {
        headers: {
            Authorization: `Bearer ${JWT}`,
            "content-type": "application/json",
        },
    };
};

const getMultipartHeader = () => {
    return {
        headers: {
            pinata_api_key: ApiKey,
            pinata_secret_api_key: ApiSecret, "content-type": "multipart/form-data",
        },
    };
};

export const testAuthentication = () => {
    const url = `/data/testAuthentication`;
    return instance
        .get(url,
            getHeader()
        )
        .then(function (response) {
            console.log(response);
            //handle your response here
        })
        .catch(function (error) {
            console.log(error);
            //handle error here
        });
};

export const pinFileToIPFS = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const url = `/pinning/pinFileToIPFS`;
    return instance.post(url, formData, getMultipartHeader())
}

export const pinJSONToIPFS = (json) => {
    const url = `/pinning/pinJSONToIPFS`;
    return instance.post(url, json, getHeader())

}

export const unPin = (hash) => {
    const url = `/pinning/unpin/${hash}`;
    return instance.delete(url, getHeader());
}

export const getJSONfromHash = (hash) => {
    return axios.get(`https://ipfs.infura.io/ipfs/${hash}`);
}