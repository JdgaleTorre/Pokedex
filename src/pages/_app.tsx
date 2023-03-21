import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/global.css";
import { trpc } from "~/utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(MyApp);
