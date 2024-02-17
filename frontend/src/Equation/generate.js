let answer = [];
import mathsteps from "mathsteps";
function swapVariables(eqn) {
  let newstr = "";

  if (eqn[0] !== "+" && eqn[0] !== "-") {
    newstr = "+" + eqn;
  } else {
    newstr = eqn;
  }
  console.log("First sign added ", newstr);

  let index_equal = newstr.indexOf("=");

  let leftside = newstr.slice(0, index_equal + 1);
  let rightside = newstr.slice(index_equal + 1);
  console.log("printing left side", leftside);
  console.log("printing right side", rightside);

  //standarizing right side too
  if (rightside[0] !== "+" && rightside[0] !== "-") {
    rightside = "+" + rightside;
  } else {
    rightside = rightside;
  }

  console.log("printing the right side after standarizing", rightside);

  let len = rightside.length;
  let pos = 0;
  let modified_rightside = "";
  while (pos < len) {
    if (rightside[pos] === "+") {
      modified_rightside = modified_rightside + "-";
    } else if (rightside[pos] === "-") {
      modified_rightside = modified_rightside + "+";
    } else {
      modified_rightside = modified_rightside + rightside[pos];
    }
    pos++;
  }

  console.log(
    "printing modified right side by changing the sign",
    modified_rightside
  );

  let finalstring = "";

  finalstring = modified_rightside + leftside + "0";
  console.log("printing final string", finalstring);
  return finalstring;
}

function changeposition(eqn) {
  let index_equal = eqn.indexOf("=");
  let pos_of_x = eqn.indexOf("x");
  let pos_of_y = eqn.indexOf("y");
  if (pos_of_y < pos_of_x) {
    let party = eqn.slice(0, pos_of_y + 1);
    let partx = eqn.slice(pos_of_y + 1, index_equal);
    let posequal = eqn.slice(index_equal);
    let newstring = "";
    newstring = partx + party + posequal;
    return newstring;
  }
  return eqn;
}

export const solve_equation = (equation) => {
  console.log("Given Equation: ", equation);
  answer.push(`Given Equation: ${equation}`);
  const AllEquation = equation;
  let firstEquation = AllEquation.split(",")[0];
  let secondEquation = AllEquation.split(",")[1];

  if (secondEquation == null) {
    console.log("second equation is null");
    const answer = [];
    const steps2 = mathsteps.solveEquation(firstEquation);
    steps2.forEach((step) => {
      answer.push(`${step.changeType}`);
      answer.push(`${step.newEquation.ascii()}`);
      //console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
      console.log(step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
      console.log(step.newEquation.ascii()); // e.g. after change: 5x = 35
      let result = step.newEquation.ascii();
      answer.push(result);

      // console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
    });
    return answer;
  }

  console.log("printing before swappinhg");
  console.log("firstEquation", firstEquation);
  console.log("secondEquation", secondEquation);
  firstEquation = swapVariables(firstEquation);
  secondEquation = swapVariables(secondEquation);
  firstEquation = changeposition(firstEquation);
  secondEquation = changeposition(secondEquation);
  console.log("printing after swappinhg");
  console.log("firstEquation", firstEquation);
  console.log("secondEquation", secondEquation);
  firstEquation = firstEquation.replace(" ", "");
  secondEquation = secondEquation.replace(" ", "");
  // console.log("printing the equation after swapping variables");
  // console.log(firstEquation);
  if (firstEquation[0] === "+") {
    //console.log("it consist of +");
    firstEquation = firstEquation.slice(1);
  }
  if (secondEquation[0] === "+") {
    //  console.log("it consist of +");
    secondEquation = secondEquation.slice(1);
  }

  //console.log(firstEquation);
  //console.log(secondEquation);

  const steps = mathsteps.solveEquation(firstEquation.toString());
  let result;
  let result1;
  if (steps.length != 0) {
    steps.forEach((step) => {
      //console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
      //console.log("change: " + step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
      //console.log("after change: " + step.newEquation.ascii()); // e.g. after change: 5x = 35
      result = step.newEquation.ascii();
      //console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
    });
  } else {
    result = firstEquation.toString();
  }
  const changes = mathsteps.ChangeTypes;

  const steps1 = mathsteps.solveEquation(secondEquation);
  steps1.forEach((step) => {
    //console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
    //console.log("change: " + step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
    //console.log("after change: " + step.newEquation.ascii()); // e.g. after change: 5x = 35
    result1 = step.newEquation.ascii();
    //console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
  });

  // let check;
  // const steps5 = mathsteps.solveEquation(result1);
  // steps1.forEach((step) => {
  //   //console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
  //   //console.log("change: " + step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
  //   //console.log("after change: " + step.newEquation.ascii()); // e.g. after change: 5x = 35
  //   check = step.newEquation.ascii();
  //   //console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
  // });
  // console.log("check:", check);
  answer.push(`First Equation:${result}`);
  answer.push(`Second Equation:${result1}`);
  console.log("first equation", result);
  console.log("second equation", result1);
  let forx = result;

  let final;
  result = result.replace(/^x\s*=\s*/, "");
  result1 = result1.replace(/^x\s*=\s*/, "");
  final = `${result}=${result1}`;
  // Constructing equation c
  //final = `${aMatches[0]}=${bMatches[0]}`;

  answer.push(`Final Expression:${final}`);

  console.log("final expression", final); // Output: "4(y)-3=2*y+2"

  let result2;
  const steps2 = mathsteps.solveEquation(final);
  steps2.forEach((step) => {
    answer.push(`${step.changeType}`);
    answer.push(`${step.newEquation.ascii()}`);
    //console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
    console.log(step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log(step.newEquation.ascii()); // e.g. after change: 5x = 35
    result2 = step.newEquation.ascii();
    // console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
  });

  answer.push(` Value of y is :${result2}`);

  console.log("value of y is :", result2);
  //console.log(result2);
  result2 = result2.replace("= ", "");
  result2 = result2.replace("y", "");
  let y = result2.replace(" ", "");
  // console.log("before parsing", y);
  // y = Number(y);
  // console.log("after parsing", y);
  //console.log(y);
  answer.push("Substituting value of y in equation One");
  console.log("Substituting value of y in equation One");
  function detectCoefficient(equation) {
    equation = equation.replace(" ", "");
    // Remove all spaces from the equation
    equation = equation.replace(/\s/g, "");

    // Use regular expression to find the coefficient of y
    var matches = equation.match(/[+-]?\d*y/);
    //   console.log(matches);

    if (matches) {
      // Extract the coefficient from the matched string
      var coefficient = matches[0].replace(/[^0-9-]/g, "");
      // console.log("object");
      //console.log(coefficient);
      //console.log("inside the coeff func", coefficient);
      //coefficient=parseInt(coefficient)
      // console.log(type(coefficient))

      // Return the coefficient
      if (isNaN(parseInt(coefficient))) {
        // console.log("no coefficient");
        return "noCoeff";
      }
      //console.log(isNaN(coefficient));
      //console.log(parseInt(coefficient));
      return parseInt(coefficient);
    } else {
      // If no coefficient is found, return 0
      return "noCoeff";
    }
  }
  //console.log(detectCoefficient(forx));
  //console.log("value of y is: ", y);
  if (detectCoefficient(forx) === "noCoeff") {
    //   console.log("if");
    forx = forx.replace("y", `${y}`);
  } else {
    forx = forx.replace("y", `*${y}`);
  }
  answer.push(`Value of Y is ${y}`);
  answer.push("After the sbustituting the values");
  console.log("value of y is: ", y);
  console.log("after substituting the values");
  let finalresult;
  console.log(forx);
  forx = forx.toString();
  const steps3 = mathsteps.solveEquation(forx);
  steps3.forEach((step) => {
    answer.push(`${step.changeType}`);
    answer.push(`${step.newEquation.ascii()}`);
    // console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
    console.log(step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log(step.newEquation.ascii()); // e.g. after change: 5x = 35
    finalresult = step.newEquation.ascii();
    // console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
  });
  let x = finalresult.replace("x = ", "");
  answer.push(`Value of X is : ${finalresult.replace("x = ", "")}`);
  answer.push(`Value of Y is : ${result2}`);
  console.log("value of x is : ", finalresult.replace("x = ", ""));
  console.log("value of y is :", result2);

  let finalanswer = {
    x: x,
    y: y,
  };
  console.log("final results is : ", finalanswer);
  //answer.push(finalanswer);
  return answer;
};

// solve_equation(" 3x-y=10,x+2y=15");
// module.exports = solve_equation;