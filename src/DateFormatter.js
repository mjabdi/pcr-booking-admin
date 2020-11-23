


const FormatDateFromString = (str) =>
{
    return `${str.substr(8,2)}-${str.substr(5,2)}-${str.substr(0,4)}`;
}

const FormatDateFromStringShortYear = (str) =>
{
    return `${str.substr(8,2)}-${str.substr(5,2)}-${str.substr(2,2)}`;
}



module.exports = {
    FormatDateFromString : FormatDateFromString,
    FormatDateFromStringShortYear : FormatDateFromStringShortYear
}