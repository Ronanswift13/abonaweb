import { PageHeader } from "@/components/sections/PageHeader";
import { ProductScenes } from "@/components/sections/Scenes";
import { pageMetadata } from "@/lib/metadata";

const title = "产品与解决方案";
const description = "变电站监测平台、值守语音汇报系统、后勤语音助手和自研行业大模型。";

export const metadata = pageMetadata({ title, description, path: "/products" });

export default function ProductsPage() {
  return (
    <>
      <PageHeader title={title} description={description} breadcrumbs={[{ label: title, href: "/products" }]} />
      <ProductScenes />
    </>
  );
}
