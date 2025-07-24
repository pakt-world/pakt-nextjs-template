/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { PaktSDK } from 'pakt-sdk';
import ENVS from "@/core/config";
/* -------------------------------------------------------------------------- */
/*                             PAKT SDK Instance                             */
/* -------------------------------------------------------------------------- */

const PaktSDKInstance = async () => {
    return await PaktSDK.init({
      baseUrl: ENVS.NEXT_PUBLIC_API_URL || "https://api-devpaktbuild.chain.site",
      verbose: true,
      testnet: !ENVS.isProduction,
    });
}

export default PaktSDKInstance;