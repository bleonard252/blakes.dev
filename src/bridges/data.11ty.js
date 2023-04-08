import bridges from "./bridges.11tydata.json";
module.exports = class {
  data() {
    return {
      permalink: "/bridges/data.json",
    };
  }

  render(data) {
    return JSON.stringify({bridges: bridges.bridges, __bridges_license: bridges.__bridges_license});
  }
}
/*
  Substitution strings quick docs:
  {FROM} - The full address of the user in question. This is typically the same as {FROM_USER}@{FROM_DOMAIN}.
  {FROM_PUBKEY} - For platforms that identify users by public key, this is the public key of the user in question.
  {FROM_USER} - The username of the user in question. NOT the user's display name.
  {FROM_DOMAIN} - The domain of the user in question.
 */