import {UpdateCoachDto} from "../../dtos/updateCoach.dto";
import {isEmpty} from "../../utils/util";
import {HttpException} from "../../exceptions/HttpException";
import {Coach} from "../../entity/coach";
import {getManager, getRepository} from "typeorm";


export class CoachService{
    update = async (id: number, updateCoachDto: UpdateCoachDto) => {
        if (isEmpty(updateCoachDto)) throw new HttpException(200, "You're not userData");

        const findCoach: Coach = await Coach.findOne(id);
        if(!findCoach) throw new HttpException(200, "You're not user");

        await Coach.update(id, updateCoachDto);

        return await Coach.findOne(id);
    }

    delete = async (id:number) => {
        await Coach.delete(id);
    }

    findCoachByInviteCode = async (invitation_code: number) => {
        return await getRepository(Coach)
            .createQueryBuilder()
            .select("*")
            .where("invitation_code = :invitation_code", {invitation_code: invitation_code })
            .getRawOne();
    } 

    findCoachByPosition = async (positionId: number) => {
        return await getRepository(Coach)
            .createQueryBuilder()
            .select("*")
            .where("position = :position", {position: positionId })
            .orderBy("rating", 'DESC')
            .getRawMany();
    }

    findCoachByCourse = async (courseId: string) => {
        return await getRepository(Coach)
            .createQueryBuilder()
            .select("*")
            .where("course = :course", {course: courseId })
            .orderBy("rating", 'DESC')
            .getRawMany();
    }
    
    findCoachById = async (id) => {
        return await Coach.findOne(id);
    }

    findCoachOrderByRate = async () => {
        return await getRepository(Coach)
            .createQueryBuilder()
            .select("*")
            .orderBy("rating", 'DESC')
            .getRawMany();
    }

    findAllCoach = async () => {
        return await Coach.find();
    }

}