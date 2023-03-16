import { __awaiter, __generator } from "tslib";
import { openAlert, openConfirm, openPrompt } from "./alert";
import { Button } from "./button";
import { Input, InputWithLabel } from "./input";
import { Select, SelectWithLabel } from "./select";
export function ComponentDemo() {
    var _this = this;
    return (<main class="p-12">
      <div class="flex space-x-4">
        <div class="flex-1 rounded border border-base-300 bg-base-100 p-4 text-base-content">
          This is bg-base-100 and text-base-content
          <div class="text-base-content-lighter">
            This is text-base-content-lighter
          </div>
        </div>
        <div class="flex-1 rounded border border-base-300 bg-base-200 p-4 text-base-content">
          This is bg-base-200 and text-base-content
          <div class="text-base-content-lighter">
            This is text-base-content-lighter
          </div>
        </div>
        <div class="flex-1 rounded border border-base-300 bg-base-300 p-4 text-base-content">
          This is bg-base-300 and text-base-content
          <div class="text-base-content-lighter">
            This is text-base-content-lighter
          </div>
        </div>
      </div>
      <div class="mt-12 flex space-x-4">
        <div class="flex flex-1 rounded bg-neutral text-neutral-content">
          <div class="flex-1 p-4">
            This is bg-neutral and text-neutral-content
          </div>
          <div class="w-1/4 rounded-r bg-neutral-focus"></div>
        </div>
        <div class="flex flex-1 rounded bg-primary text-primary-content">
          <div class="flex-1 p-4">
            This is bg-primary and text-primary-content
          </div>
          <div class="w-1/4 rounded-r bg-primary-focus"></div>
        </div>
        <div class="flex flex-1 rounded bg-secondary text-secondary-content">
          <div class="flex-1 p-4">
            This is bg-secondary and text-secondary-content
          </div>
          <div class="w-1/4 rounded-r bg-secondary-focus"></div>
        </div>
        <div class="flex flex-1 rounded bg-accent text-accent-content">
          <div class="flex-1 p-4">
            This is bg-accent and text-accent-content
          </div>
          <div class="w-1/4 rounded-r bg-accent-focus"></div>
        </div>
      </div>
      <div class="mt-12 flex space-x-4">
        <div class="flex flex-1 rounded bg-success text-success-content">
          <div class="flex-1 p-4">
            This is bg-success and text-success-content
          </div>
          <div class="w-1/4 rounded-r bg-success-focus"></div>
        </div>
        <div class="flex flex-1 rounded bg-warning text-warning-content">
          <div class="flex-1 p-4">
            This is bg-warning and text-warning-content
          </div>
          <div class="w-1/4 rounded-r bg-warning-focus"></div>
        </div>
        <div class="flex flex-1 rounded bg-error text-error-content">
          <div class="flex-1 p-4">This is bg-error and text-error-content</div>
          <div class="w-1/4 rounded-r bg-error-focus"></div>
        </div>
      </div>
      <div class="mt-12 text-xl font-700">This is sans font at 700</div>
      <div class="mt-4">This is sans font</div>
      <div class="font-mono mt-4">This is mono font</div>
      <div class="mt-12 flex space-x-2">
        <Button onClick={function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("start");
                        return [4 /*yield*/, openAlert({
                                text: "Hello! asdf asdf asdf asdfasdfasdf asdf asdf asdfasdfas fasdf asdf asdfasdfa sdf asdf asdf asdf asd fasdfasdf asdfasdfasfdsa d ",
                            })];
                    case 1:
                        _a.sent();
                        console.log("done");
                        return [2 /*return*/];
                }
            });
        }); }}>
          Click alert
        </Button>
        <Button onClick={function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, openConfirm({ text: "Hello!" })];
                    case 1:
                        res = _a.sent();
                        console.log("done", res);
                        return [2 /*return*/];
                }
            });
        }); }}>
          Click confirm
        </Button>
        <Button onClick={function () { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        document.activeElement.blur();
                        return [4 /*yield*/, openPrompt({
                                text: "Hello!",
                                initialInputText: "hmm",
                            })];
                    case 1:
                        res = _a.sent();
                        console.log("done", res);
                        return [2 /*return*/];
                }
            });
        }); }}>
          Click prompt
        </Button>
        <Input />
        <Select options={[
            { key: "1", text: "Tim" },
            { key: "2", text: "Tom" },
            { key: "3", text: "Tut" },
        ]} selected="1" onChange={function (v) {
            console.log(v);
        }}/>
      </div>
      <div class="mt-12 space-y-6">
        <Button onClick={function () { }}>Click me</Button>
        <InputWithLabel rootId="dfd" label="Input thing"/>
        <SelectWithLabel rootId="dfdsdfd" label="Select thing" options={[
            { key: "1", text: "Tim" },
            { key: "2", text: "Tom" },
        ]} selected="1" onChange={function () { }}/>
      </div>
    </main>);
}
//# sourceMappingURL=component_demo.jsx.map