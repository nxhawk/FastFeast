import { type Metadata } from "next";
import React from "react";
import ListCategory from "@/components/user/list-category";
import { listCategories } from "@/models/category";

export const metadata: Metadata = {
  title: "Sản phẩm | FastFeast - Fast Food Ordering website",
  description: "Fast Food Ordering website",
  icons: "images/logo.png",
};

const Page = async () => {
  const categories = await listCategories();

  return (
    <div className="relative">
      <ListCategory categories={categories} />
      <div className="pt-28">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, non incidunt animi quaerat amet
        exercitationem provident adipisci eius sit beatae iure ad consequatur vitae hic mollitia voluptate cupiditate
        totam explicabo! Quibusdam mollitia itaque dolore dolorem doloremque consectetur voluptas sunt debitis
        voluptatem tempore assumenda odio, deserunt qui. Aliquid in quia quo aliquam suscipit quidem, ullam provident
        modi numquam soluta animi quas? Voluptatum tenetur fuga eaque sed maxime in temporibus minus reprehenderit
        officia! Et, perferendis. Sapiente cumque aut doloremque libero praesentium? Voluptatibus quaerat dignissimos
        molestiae provident. Est reiciendis non exercitationem esse voluptatum. Voluptate saepe possimus, culpa natus
        error molestiae illo, dolores tempore dignissimos doloremque repudiandae delectus assumenda? Quas vitae ex,
        provident ipsam architecto alias minima nihil nobis cupiditate quidem harum officiis enim. Consequuntur ipsum
        animi aut ad doloribus voluptas, maiores ut illum, veniam alias nemo, sint inventore perferendis ducimus labore!
        Eos, necessitatibus consequuntur? Repellendus aperiam nesciunt animi ipsum amet! Doloribus, delectus id.
        Reiciendis porro, recusandae numquam reprehenderit ratione officia eligendi eos qui maiores adipisci, deserunt
        temporibus veritatis quae cumque inventore nihil accusantium aliquam iusto consequuntur est rerum repellendus
        ullam doloremque cupiditate. Amet? Iste id esse corrupti delectus, eos labore tempore incidunt provident at qui
        consequatur culpa adipisci nemo odio quo amet, sed, nostrum rem itaque eligendi sunt! Perferendis quas nihil
        nostrum ipsa. Repudiandae debitis assumenda dignissimos voluptatibus tempora illum molestiae dolorem, iusto
        neque ipsa suscipit fugit distinctio dolorum aperiam error quos nemo dicta adipisci, architecto quia inventore!
        Temporibus dicta dolorum ducimus voluptatum. Tempore nobis magnam voluptates fugit at error suscipit fuga
        consequuntur. Maxime, iure ad repellat repellendus aliquid perspiciatis fugiat aperiam quia sapiente natus ipsa
        necessitatibus sit consectetur ratione harum odit porro. Ratione velit quod laudantium distinctio, dignissimos
        ea aspernatur laborum nihil aliquid consectetur! Facere asperiores deserunt temporibus dolores in. Autem nisi
        sit eum voluptates illo nesciunt nemo fuga cum esse placeat.
      </div>
    </div>
  );
};

export default Page;
