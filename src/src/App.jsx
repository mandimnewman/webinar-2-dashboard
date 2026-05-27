import { useState } from "react";

const PEOPLE = {
  Pooja:    { c: "#185FA5", bg: "#E6F1FB", t: "#0C447C" },
  Mandi:    { c: "#0F6E56", bg: "#E1F5EE", t: "#085041" },
  Ishana:   { c: "#533AB7", bg: "#EEEDFE", t: "#3C3489" },
  Nouaama:  { c: "#BA7517", bg: "#FAEEDA", t: "#633806" },
  Shivaun:  { c: "#3B6D11", bg: "#EAF3DE", t: "#27500A" },
  Francois: { c: "#993C1D", bg: "#FAECE7", t: "#712B13" },
  Mukundan: { c: "#A32D2D", bg: "#FCEBEB", t: "#791F1F" },
  Becca:    { c: "#993556", bg: "#FBEAF0", t: "#72243E" },
  Alyssa:   { c: "#5F5E5A", bg: "#F1EFE8", t: "#444441" },
  All:      { c: "#888780", bg: "#F1EFE8", t: "#5F5E5A" },
};

const CAT_STYLES = {
  Email:        { bg: "#E6F1FB", co: "#0C447C", b: "#185FA5" },
  LinkedIn:     { bg: "#EAF3DE", co: "#27500A", b: "#3B6D11" },
  Platform:     { bg: "#EEEDFE", co: "#3C3489", b: "#534AB7" },
  Content:      { bg: "#FAEEDA", co: "#633806", b: "#BA7517" },
  "Live event": { bg: "#FCEBEB", co: "#791F1F", b: "#A32D2D" },
  Operations:   { bg: "#F1EFE8", co: "#444441", b: "#888780" },
  Sales:        { bg: "#FBEAF0", co: "#72243E", b: "#993556" },
};

const RACI_STYLES = {
  R: { bg: "#E6F1FB", co: "#0C447C" },
  A: { bg: "#EAF3DE", co: "#27500A" },
  C: { bg: "#FAEEDA", co: "#633806"
