import { NotFoundException } from "@utils/exceptions";
import { prismaClient } from "@utils/prisma";
import { Created, Successful } from "@utils/success";
import { NextFunction, Request, Response } from "express";

export const createIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { label, ip_address, comment } = req.body;

  const ipAddress = await prismaClient.ipAddress.create({
    data: {
      label,
      address: ip_address,
      comment,
      created_by: "Make this dynamic uuid from request headers",
    },
  });

  next(new Created(ipAddress, "IP Address created successfully"));
};

export const getIPAddresses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ipAddresses = await prismaClient.ipAddress.findMany();

  next(new Successful(ipAddresses));
};

export const getIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const ipAddress = await prismaClient.ipAddress.findFirst({
    where: {
      id,
    },
  });

  if (!ipAddress) {
    throw new NotFoundException();
  }

  next(new Successful(ipAddress));
};

export const updateIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  let ipAddress = await prismaClient.ipAddress.findFirst({
    where: {
      id,
    },
  });

  if (!ipAddress) {
    throw new NotFoundException();
  }

  ipAddress = await prismaClient.ipAddress.update({
    where: {
      id: ipAddress.id,
    },
    data: {
      ...req.body,
    },
  });

  next(new Successful(ipAddress));
};

export const deleteIPAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  let ipAddress = await prismaClient.ipAddress.findFirst({
    where: {
      id,
    },
  });

  if (!ipAddress) {
    throw new NotFoundException();
  }

  await prismaClient.ipAddress.delete({
    where: {
      id,
    },
  });

  next(new Successful(null));
};
