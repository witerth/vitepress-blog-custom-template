import { SetupContext } from "vue";

export default (props: {}, { slots }: SetupContext) => {
  return (
    <div class="main-content-center default-shadow w-full">
      <div class={"flex  items-center  justify-center w-full"}>
        <div class="main-content-container w-full">
          <div class="main-content-solot w-full">{slots.default?.()}</div>
        </div>
      </div>
    </div>
  );
};
