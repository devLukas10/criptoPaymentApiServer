

export const EtherFormatWei = (wei: any, ethers: any): number => {
    let value = ethers.formatEther(wei);
    return parseFloat(value);
}