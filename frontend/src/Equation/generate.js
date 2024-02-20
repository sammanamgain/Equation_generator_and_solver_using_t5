let answer = [];
//importing the library
import mathsteps from "mathsteps";

//standarizing the equation to ax+by+c=0,this will not ensure  the x will always come first , swapping function does that which is placed below
function makeStandarize(eqn) {
  let newstr = "";

  if (eqn[0] !== "+" && eqn[0] !== "-") {
    newstr = "+" + eqn;
  } else {
    newstr = eqn;
  }
  console.log("First sign added ", newstr);

  let index_equal = newstr.indexOf("=");

  //separating left side and right side using =

  let leftside = newstr.slice(0, index_equal + 1);
  let rightside = newstr.slice(index_equal + 1);
  console.log("printing left side", leftside);
  console.log("printing right side", rightside);

  //standarizing right side too
  if (rightside[0] !== "+" && rightside[0] !== "-") {
    rightside = "+" + rightside;
  }
  let isolated_bracket;

  if (rightside.includes("(")) {
    console.log("it contains ()");
    let pos_of_leftbracket = rightside.indexOf("(");
    let pos_of_rightbracket = rightside.indexOf(")");

    //isolating the brackets only
    isolated_bracket = rightside.slice(
      pos_of_leftbracket,
      pos_of_rightbracket + 1
    );
    console.log("Isolated bracket : ", isolated_bracket);

    rightside = rightside.replace(`${isolated_bracket}`, "Don't_touch");
    console.log(rightside);
  }

  console.log("printing the right side after standarizing", rightside);
  //changing the sign of right side
  let len = rightside.length;
  let pos = 0;
  let modified_rightside = "";
  while (pos < len) {
    if (rightside[pos] === "+") {
      modified_rightside += "-";
    } else if (rightside[pos] === "-") {
      modified_rightside += "+";
    } else {
      modified_rightside += rightside[pos];
    }
    pos++;
  }

  modified_rightside = modified_rightside.replace(
    "Don't_touch",
    `${isolated_bracket}`
  );
  modified_rightside = modified_rightside.replace(" ", "");

  console.log(
    "printing modified right side by changing the sign",
    modified_rightside
  );

  let finalstring = "";

  finalstring = modified_rightside + leftside + "0";
  console.log("printing final string", finalstring);
  return finalstring;
}

//This will change the position of x and y , it will make x appear first ,and y appear second

function changeposition(eqn) {
  let index_equal = eqn.indexOf("=");
  let pos_of_x = eqn.indexOf("x");
  let pos_of_y = eqn.indexOf("y");
  if (pos_of_y < pos_of_x) {
    let pos_of_closest_operator;
    for (let i = pos_of_x; i > pos_of_y; i--) {
      //    console.log(eqn[i]);
      if (eqn[i] === "+" || eqn[i] === "+") {
        pos_of_closest_operator = i;
        break;
      }
    }
    // console.log("position of the closed operator ", pos_of_closest_operator);
    let component_of_x = eqn.slice(pos_of_closest_operator, index_equal);
    // console.log("component of x is", component_of_x);
    let component_of_y = eqn.slice(0, pos_of_closest_operator);
    return component_of_x + component_of_y + eqn.slice(index_equal);
  }
  return eqn;
}

export const solve_equation = (equation) => {
  console.log("Given Equation: ", equation);
  answer.push(`Given Equation: ${equation}`);
  const AllEquation = equation;
  //spliting the equation based on ,
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

  //standarizing function
  firstEquation = makeStandarize(firstEquation);
  secondEquation = makeStandarize(secondEquation);
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

  answer.push(`First Equation:${result}`);
  answer.push(`Second Equation:${result1}`);
  console.log("first equation", result);
  result = result.replace(" ", "");
  console.log("second equation", result1);
  let forx = result;

  let final;
  result = result.replace(/^x\s*=\s*/, "");
  result1 = result1.replace(/^x\s*=\s*/, "");

  //function to check xandy are consecutive like xy
  function check_xy() {
    let pos_of_x = result1.indexOf("x");
    let pos_of_y = result1.indexOf("y");
    if (pos_of_y - pos_of_x === 1) {
      return true;
    }
    return false;
  }
  // if (check_xy()) {
  //   console.log("check x and y");
  //   let pos_of_equal = result1.indexOf("=");

  //   let afterequal = result1.slice(pos_of_equal + 1);
  //   afterequal = afterequal.replace(" ", "");
  //   if (afterequal[0] !== "+" || afterequal[0] !== "-") {
  //     console.log(afterequal[0], "kei ne chaina");
  //     afterequal = "+" + afterequal;
  //   }

  //   //changesign
  //   if (afterequal[0] === "+") {
  //     console.log("plus xa ta");
  //     afterequal = "-" + afterequal.slice(1);
  //     console.log(afterequal);
  //   } else if (afterequal[0] === "-") {
  //     afterequal = "+" + afterequal.slice(1);
  //   }

  //   console.log("afterequal check xy", afterequal);

  //   final = `(${result})*${afterequal}=0`;
  // } else {
  //   final = `${result}=${result1}`;
  // }

  // Constructing equation c
  //final = `${aMatches[0]}=${bMatches[0]}`;
  final = `${result}=${result1}`;
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
