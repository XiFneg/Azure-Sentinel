import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { IsValidLogo } from "../../logoValidator";
import { ExitCode } from "../../utils/exitCode";

chai.use(chaiAsPromised);

describe("logoValidator", () => {


  it("Should not throw an exception", async () => {
    await checkValid(".script/tests/logoValidatorTest/testFiles/Morphisec_Logo.svg");
  });

  it("Should throw an exception", async () => {
    await checkInvalid(".script/tests/logoValidatorTest/testFiles/ForgeRock_Logo_Vert_75x75.png","logoValidationError");
  });
  it("Should throw an exception", async () => {
    await checkInvalid(".script/tests/logoValidatorTest/testFiles/Filewithstyletag.svg","logoValidationError");
  });
  it("Should throw an exception", async () => {
    await checkInvalid(".script/tests/logoValidatorTest/testFiles/FileWithPNGEmbed.svg","logoValidationError");
  });
  it("Should throw an exception", async () => {
    await checkInvalid(".script/tests/logoValidatorTest/testFiles/filewithxmlnsxlink.svg","logoValidationError");
  });
  it("Should throw an exception", async () => {
    await checkInvalid(".script/tests/logoValidatorTest/testFiles/fileWithxmlnsHERF.svg","logoValidationError");
  });
  
  it("Should throw an exception", async () => {
    await checkValid(".script/tests/logoValidatorTest/testFiles/filewithoutpngembed.svg");
  });
  
  async function checkValid(filePath: string): Promise<Chai.PromisedAssertion> {
    let result = await IsValidLogo(filePath);
    expect(result).to.equal(ExitCode.SUCCESS);
  }

  async function checkInvalid(filePath: string, expectedError: string): Promise<Chai.PromisedAssertion> {
    expect(IsValidLogo(filePath)).eventually.rejectedWith(Error).and.have.property("name", expectedError);
  }
});
